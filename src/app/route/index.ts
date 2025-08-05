import { Router } from "express";
import userRouter from "../modules/users/user.router";
import { authRouter } from "../modules/auth/authRouter";
import tourRoutes from "../modules/tours/tour.router";
import divisionRouter from "../modules/division/division.route";

export const route = Router();

const moduleRoutes = [
    {
        path : "/user",
        routes : userRouter
    },
    {
        path : "/auth",
        routes : authRouter
    },
    {
        path : "/tour",
        routes : tourRoutes
    },
    {
        path : "/division",
        routes : divisionRouter
    }
];


moduleRoutes.forEach((rou) =>{
    route.use(rou.path , rou.routes);
})