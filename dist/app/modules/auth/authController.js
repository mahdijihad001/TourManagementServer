"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const authServices_1 = require("./authServices");
const sendResponse_1 = require("../../utils/sendResponse");
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const http_status_codes_1 = require("http-status-codes");
const setAuthCookie_1 = require("../../utils/setAuthCookie");
const createUserToken_1 = require("../../utils/createUserToken");
const env_1 = require("../../config/env");
const passport_1 = __importDefault(require("passport"));
const logInUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(new app_error_1.default(401, err));
        }
        if (!user) {
            // return new AppError(404 , info.message)
            return next(new app_error_1.default(401, info.message));
        }
        ;
        const userTokens = yield (0, createUserToken_1.createUserTokens)(user);
        const _a = user.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
        (0, setAuthCookie_1.setAuthCookie)(res, userTokens);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "User successfully login",
            data: {
                accessToken: userTokens.accessToken,
                refresToken: userTokens.refreshToken,
                user: rest
            }
        });
    }))(req, res, next);
    // const result = await authServices.logInUser(req.body);
}));
// const loginUser1 = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const result = await authServices.logInUser(req.body);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "User Refreshed Successfully!",
//         data: result
//     });
// })
const getNewAccessToken = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken;
    if (!token) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "No refresh token recived form cookies!");
    }
    const tokenInfo = yield authServices_1.authServices.getNewAccessTokenUseRefreshToken(token);
    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    (0, setAuthCookie_1.setAuthCookie)(res, tokenInfo);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User Refreshed Successfully!",
        data: tokenInfo
    });
}));
const logOut = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshToken", { httpOnly: true, secure: false, sameSite: "lax" });
    res.clearCookie("accessToken", { httpOnly: true, secure: false, sameSite: "lax" });
    (0, sendResponse_1.sendResponse)(res, {
        message: "Logout Successfully!",
        success: true,
        data: null,
        statusCode: 200
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    authServices_1.authServices.resetPassword(decodedToken, newPassword, oldPassword);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Password changed successfully!",
        data: null
    });
}));
const googleCallbackController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let redirectTo = req.query.state ? req.query.state : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    if (!user) {
        throw new app_error_1.default(404, "User not found");
    }
    ;
    const tokenInfo = yield (0, createUserToken_1.createUserTokens)(user);
    (0, setAuthCookie_1.setAuthCookie)(res, tokenInfo);
    res.redirect(`${env_1.envVar.FRONTEND_URL}/${redirectTo}`);
}));
exports.authController = {
    logInUser,
    getNewAccessToken,
    logOut,
    resetPassword,
    googleCallbackController
};
