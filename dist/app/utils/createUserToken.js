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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokens = void 0;
const jwt_1 = require("./jwt");
const createUserTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtPayload = { userID: user._id, email: user.email, role: user.role };
    const accessTok = (0, jwt_1.generateJwtToken)(jwtPayload);
    const refreshTok = (0, jwt_1.refreshToken)(jwtPayload);
    return {
        accessToken: accessTok,
        refreshToken: refreshTok
    };
});
exports.createUserTokens = createUserTokens;
