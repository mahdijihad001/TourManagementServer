"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const user_router_1 = __importDefault(require("../modules/users/user.router"));
const authRouter_1 = require("../modules/auth/authRouter");
const tour_router_1 = __importDefault(require("../modules/tours/tour.router"));
const division_route_1 = __importDefault(require("../modules/division/division.route"));
const booking_router_1 = __importDefault(require("../modules/booking/booking.router"));
exports.route = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        routes: user_router_1.default
    },
    {
        path: "/auth",
        routes: authRouter_1.authRouter
    },
    {
        path: "/tour",
        routes: tour_router_1.default
    },
    {
        path: "/division",
        routes: division_route_1.default
    },
    {
        path: "/booking",
        routes: booking_router_1.default
    }
];
moduleRoutes.forEach((rou) => {
    exports.route.use(rou.path, rou.routes);
});
