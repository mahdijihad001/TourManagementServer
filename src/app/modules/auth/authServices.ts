import AppError from "../../errorHelpers/app.error";
import { IAuthprovider, IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { createUserTokens } from "../../utils/createUserToken";
import { createAccessTokenWithRefreshToken } from "../../utils/createSccessTokenWithRefreshToken";
import { JwtPayload } from "jsonwebtoken";
import { envVar } from "../../config/env";
import { sendEmail } from "../../utils/sendEmail";


const logInUser = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const existUser = await User.findOne({ email });

    if (!existUser) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not exist")
    }

    const matchPassword = await bcrypt.compare(password as string, existUser.password as string);

    if (!matchPassword) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect Password");
    };

    const { password: pass, ...rest } = existUser.toObject();
    const token = createUserTokens(existUser);
    return {
        accessToken: (await token).accessToken,
        refreshToken: (await token).refreshToken,
        user: rest
    }
};
const getNewAccessTokenUseRefreshToken = async (refreshToken: string) => {
    const accessToken = await createAccessTokenWithRefreshToken(refreshToken);
    return {
        accessToken
    }
};


const resetPassword = async (decodedToken: JwtPayload, newPassword: string, oldPassword: string) => {

    const findUser = await User.findById(decodedToken.userID);

    if (!findUser) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    const checkOldPasswordMatch = await bcrypt.compare(oldPassword, findUser?.password as string);

    if (!checkOldPasswordMatch) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Old password dose not exist!");
    };

    findUser!.password = newPassword;
    await findUser!.save();
    return null;

}
const forgetPassword = async (email: string) => {

    const isExistUser = await User.findOne({ email });
    if (!isExistUser) {
        throw new AppError(400, "User not found");
    };

    const payload = {
        userID: isExistUser._id,
        email: isExistUser.email,
        role: isExistUser.role
    };

    const token = jwt.sign(payload, envVar.ACCESS_SECRATE, { expiresIn: "10m" });

    const resetUILink = `${envVar.FRONTEND_URL}/reset-password?id=${isExistUser._id}&token=${token}`;

    sendEmail({
        to: isExistUser.email,
        subject: "Forgate password request",
        templateName: `forgetPasswors`,
        templateData: {
            name: isExistUser.name,
            resetUILink
        }
    })

}
const setPassword = async (userId: string, password: string) => {

    const findUser = await User.findById(userId);

    if (!findUser) {
        throw new AppError(404, "User not found.");
    }

    if (findUser.password && findUser.auths.some((providerobj) => providerobj.provider === "Google")) {
        throw new AppError(400, "You have already set your password. You can update your password in your profile");
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const creadiantialProvider: IAuthprovider = {
        provider: "Credentials",
        prividerId: findUser.email
    };

    findUser.password = hashPassword;
    findUser.auths = [...findUser.auths, creadiantialProvider];

    await findUser.save()

}


export const authServices = {
    logInUser,
    getNewAccessTokenUseRefreshToken,
    resetPassword,
    forgetPassword,
    setPassword
}