import express, { Request, Response } from "express"
import cors from "cors"
import { route } from "./app/route";
import { globalerrorHandaler } from "./app/middleware/global.error.handalar";
import { StatusCodes } from "http-status-codes";
import "./app/config/pasport"
import cookiePerser from "cookie-parser";
import notFound from "./app/errorHelpers/notFound";
import passport from "passport";
import expressSession from "express-session"

const app = express();

// Middleware
app.use(expressSession({
    secret : "Your Secrate",
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookiePerser());
app.use(cors());


// Routes

app.use("/api/v1" , route);
// api/v1/auth/google/collback


app.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send({ message: "Wellcome to ture management backend server!!" });
});


app.use(globalerrorHandaler);

app.use(notFound);


export default app