import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./authController";
import { checkAuths } from "../../middleware/protectAdmin";
import { Role } from "../users/user.interface";
import passport from "passport";

export const authRouter = Router();

authRouter.post("/login", authController.logInUser);
authRouter.post("/refresh-token", authController.getNewAccessToken);
authRouter.post("/logout", authController.logOut);
authRouter.post("/resetPassword", checkAuths(...Object.values(Role)), authController.resetPassword);
authRouter.post("/changePassword", authController.forgetPassword);
authRouter.post("/setPassword", checkAuths(...Object.values(Role)), authController.setPassword);
authRouter.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})

authRouter.get("/google/collback", passport.authenticate("google", { failureRedirect: "/login" }), authController.googleCallbackController)