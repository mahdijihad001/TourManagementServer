import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVar } from "./env";
import { User } from "../modules/users/user.model";
import { IsActive, Role } from "../modules/users/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt"


passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done) => {
        try {

            if (!email || !password) {
                return done(null, false, { message: "Email and password are required!" });
            }

            const isUserExist = await User.findOne({ email: email });

            if (!isUserExist) {
                return done(null, false, { message: "User not exist!" });
            };

            if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
                // throw new AppError(400, `User is ${isUserExist.isActive}`);
                return done(`User is ${isUserExist.isActive}`);
            };

            const isGoogleauthenticate = isUserExist.auths.some(provider => provider.provider == "Google");

            if (isGoogleauthenticate && !isUserExist.password) {
                return done(null, false, { message: "You have authenticate through google. So is you want to login creadientials, Then at first login google and set a password for yous gamil then you can login gamil and password" });
            };

            const isPasswordMatch = await bcrypt.compare(password as string, isUserExist.password as string);

            if (!isPasswordMatch) {
                return done(null, false, { message: "Invalid password!" });
            };

            return done(null, isUserExist)

        } catch (error) {
            console.log("Google login Error", error);
            done(error);
        }
    })
)

passport.use(
    new GoogleStrategy(
        {
            clientID: envVar.GOOGLE_CLIENT_ID,
            clientSecret: envVar.GOOGLE_CLIENT_SECRET,
            callbackURL: envVar.GOOGLE_CALLBACK_URL
        }, async (accessToken, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                const email = profile.emails?.[0].value;

                if (!email) {
                    return done(null, false, { message: "Email not found" });
                }

                let user = await User.findOne({ email: email });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: email,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerifid: true,
                        auths: [
                            {
                                provider: "Google",
                                prividerId: profile.id
                            }
                        ]
                    })
                }

                return done(null, user);

            } catch (error) {
                console.log("Google Strategy Error", error);
                return done(error);
            }
        }
    )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
});

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);

        done(null, user);

    } catch (error) {
        console.log("Deserialized User");
        done(error)
    }
})