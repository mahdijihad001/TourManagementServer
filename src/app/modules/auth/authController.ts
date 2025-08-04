import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./authServices";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/app.error";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/createUserToken";
import { envVar } from "../../config/env";
import passport from "passport";

const logInUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", async (err: any, user: any, info: any) => {

        if (err) {
            return next(new AppError(401, err));
        }

        if (!user) {
            // return new AppError(404 , info.message)
            return next(new AppError(401, info.message));
        };



        const userTokens = await createUserTokens(user);

        const { password: pass, ...rest } = user.toObject();

        setAuthCookie(res, userTokens);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User successfully login",
            data: {
                accessToken: userTokens.accessToken,
                refresToken: userTokens.refreshToken,
                user: rest
            }
        })
    })(req, res, next)

    // const result = await authServices.logInUser(req.body);

});


const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.refreshToken;

    if (!token) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No refresh token recived form cookies!");
    }

    const tokenInfo = await authServices.getNewAccessTokenUseRefreshToken(token as string);


    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Refreshed Successfully!",
        data: tokenInfo
    });
});


const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken", { httpOnly: true, secure: false, sameSite: "lax" });
    res.clearCookie("accessToken", { httpOnly: true, secure: false, sameSite: "lax" });

    sendResponse(res, {
        message: "Logout Successfully!",
        success: true,
        data: null,
        statusCode: 200
    })

});


const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    authServices.resetPassword(decodedToken as JwtPayload, newPassword, oldPassword);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Password changed successfully!",
        data: null
    })
});


const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : "";

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }


    const user = req.user;

    if (!user) {
        throw new AppError(404, "User not found");
    };

    const tokenInfo = await createUserTokens(user);

    setAuthCookie(res, tokenInfo);
    res.redirect(`${envVar.FRONTEND_URL}/${redirectTo}`)

})

export const authController = {
    logInUser,
    getNewAccessToken,
    logOut,
    resetPassword,
    googleCallbackController
}