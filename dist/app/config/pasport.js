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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = require("./env");
const user_model_1 = require("../modules/users/user.model");
const user_interface_1 = require("../modules/users/user.interface");
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || !password) {
            return done(null, false, { message: "Email and password are required!" });
        }
        const isUserExist = yield user_model_1.User.findOne({ email: email });
        if (!isUserExist) {
            return done(null, false, { message: "User not exist!" });
        }
        ;
        const isGoogleauthenticate = isUserExist.auths.some(provider => provider.provider == "Google");
        if (isGoogleauthenticate && !isUserExist.password) {
            return done(null, false, { message: "You have authenticate through google. So is you want to login creadientials, Then at first login google and set a password for yous gamil then you can login gamil and password" });
        }
        ;
        const isPasswordMatch = yield bcrypt_1.default.compare(password, isUserExist.password);
        if (!isPasswordMatch) {
            return done(null, false, { message: "Invalid password!" });
        }
        ;
        return done(null, isUserExist);
    }
    catch (error) {
        console.log("Google login Error", error);
        done(error);
    }
})));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.envVar.GOOGLE_CLIENT_ID,
    clientSecret: env_1.envVar.GOOGLE_CLIENT_SECRET,
    callbackURL: env_1.envVar.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
        if (!email) {
            return done(null, false, { message: "Email not found" });
        }
        let user = yield user_model_1.User.findOne({ email: email });
        if (!user) {
            user = yield user_model_1.User.create({
                name: profile.displayName,
                email: email,
                picture: (_b = profile.photos) === null || _b === void 0 ? void 0 : _b[0].value,
                role: user_interface_1.Role.USER,
                isVerifid: true,
                auths: [
                    {
                        provider: "Google",
                        prividerId: profile.id
                    }
                ]
            });
        }
        return done(null, user);
    }
    catch (error) {
        console.log("Google Strategy Error", error);
        return done(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(id);
        done(null, user);
    }
    catch (error) {
        console.log("Deserialized User");
        done(error);
    }
}));
