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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessTokenWithRefreshToken = void 0;
const env_1 = require("../config/env");
const user_model_1 = require("../modules/users/user.model");
const jwt_1 = require("./jwt");
const app_error_1 = __importDefault(require("../errorHelpers/app.error"));
const http_status_codes_1 = require("http-status-codes");
const user_interface_1 = require("../modules/users/user.interface");
const createAccessTokenWithRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = (0, jwt_1.verifyTokenSecrate)(refreshToken, env_1.envVar.REFRESH_SECRATE);
    const existUser = yield user_model_1.User.findOne({ email: verify.payload.email });
    if (!existUser) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User dost not exist.");
    }
    if (existUser.isActive === user_interface_1.IsActive.BLOCKED) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is blocked.");
    }
    if (existUser.isDeleted) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is deleted");
    }
    const jwtPayload = { userID: existUser._id, email: existUser.email, role: existUser.role };
    const accrssToken = (0, jwt_1.generateJwtToken)(jwtPayload);
    return accrssToken;
});
exports.createAccessTokenWithRefreshToken = createAccessTokenWithRefreshToken;
