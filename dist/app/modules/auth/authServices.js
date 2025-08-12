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
exports.authServices = void 0;
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const user_model_1 = require("../users/user.model");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserToken_1 = require("../../utils/createUserToken");
const createSccessTokenWithRefreshToken_1 = require("../../utils/createSccessTokenWithRefreshToken");
const logInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const existUser = yield user_model_1.User.findOne({ email });
    if (!existUser) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not exist");
    }
    const matchPassword = yield bcrypt_1.default.compare(password, existUser.password);
    if (!matchPassword) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Incorrect Password");
    }
    ;
    const _a = existUser.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    const token = (0, createUserToken_1.createUserTokens)(existUser);
    return {
        accessToken: (yield token).accessToken,
        refreshToken: (yield token).refreshToken,
        user: rest
    };
});
const getNewAccessTokenUseRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield (0, createSccessTokenWithRefreshToken_1.createAccessTokenWithRefreshToken)(refreshToken);
    return {
        accessToken
    };
});
const resetPassword = (decodedToken, newPassword, oldPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findById(decodedToken.userID);
    if (!findUser) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    const checkOldPasswordMatch = yield bcrypt_1.default.compare(oldPassword, findUser === null || findUser === void 0 ? void 0 : findUser.password);
    if (!checkOldPasswordMatch) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Old password dose not exist!");
    }
    ;
    findUser.password = newPassword;
    yield findUser.save();
    return null;
});
exports.authServices = {
    logInUser,
    getNewAccessTokenUseRefreshToken,
    resetPassword
};
