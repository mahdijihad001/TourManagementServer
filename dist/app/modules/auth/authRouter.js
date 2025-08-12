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
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("./authController");
const protectAdmin_1 = require("../../middleware/protectAdmin");
const user_interface_1 = require("../users/user.interface");
const passport_1 = __importDefault(require("passport"));
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/login", authController_1.authController.logInUser);
exports.authRouter.post("/refresh-token", authController_1.authController.getNewAccessToken);
exports.authRouter.post("/logout", authController_1.authController.logOut);
exports.authRouter.post("/resetPassword", (0, protectAdmin_1.checkAuths)(...Object.values(user_interface_1.Role)), authController_1.authController.resetPassword);
exports.authRouter.get("/google", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const redirect = req.query.redirect || "/";
    passport_1.default.authenticate("google", { scope: ["profile", "email"], state: redirect })(req, res, next);
}));
exports.authRouter.get("/google/collback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), authController_1.authController.googleCallbackController);
