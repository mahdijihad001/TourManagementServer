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
exports.checkAuths = void 0;
const app_error_1 = __importDefault(require("../errorHelpers/app.error"));
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../modules/users/user.model");
const http_status_codes_1 = require("http-status-codes");
const checkAuths = (...auths) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    if (!token) {
        throw new app_error_1.default(400, "User not authorized!");
    }
    ;
    const validationUser = (0, jwt_1.verifyToken)(token);
    if (!validationUser) {
        throw new app_error_1.default(401, "User not valid");
    }
    ;
    const existUser = yield user_model_1.User.findById(validationUser.payload.userID);
    if (!existUser) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found!");
    }
    // if (existUser.isActive || existUser.isDeleted || existUser.isVerifid) {
    //     if (validationUser.payload.role === Role.USER || validationUser.payload.role === Role.GUIDE) {
    //         throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized!")
    //     }
    // }
    if (!auths.includes(validationUser.payload.role)) {
        throw new app_error_1.default(401, "You are not permited access this route!");
    }
    req.user = validationUser.payload;
    next();
});
exports.checkAuths = checkAuths;
