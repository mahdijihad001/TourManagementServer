"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const requestValidation_1 = require("../../utils/requestValidation");
const bookingZodSchema_1 = require("./bookingZodSchema");
const protectAdmin_1 = require("../../middleware/protectAdmin");
const user_interface_1 = require("../users/user.interface");
const bookingRouter = (0, express_1.Router)();
// Create booking
bookingRouter.post("/", (0, protectAdmin_1.checkAuths)(...Object.values(user_interface_1.Role)), (0, requestValidation_1.validateRequest)(bookingZodSchema_1.createBookingZodSchema), booking_controller_1.bookingController.createBooking);
// Get All Booking => ADMIN & SUPER ADMIN
bookingRouter.get("/", (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), booking_controller_1.bookingController.getAllBooking);
// Get User Booking
bookingRouter.get("/myBooking", (0, protectAdmin_1.checkAuths)(...Object.values(user_interface_1.Role)), booking_controller_1.bookingController.getUserBooking);
// Get Single Booking
bookingRouter.get("/:bookingId", (0, protectAdmin_1.checkAuths)(...Object.values(user_interface_1.Role)), booking_controller_1.bookingController.getSingleBooking);
// Update Booking
bookingRouter.patch("/:bookingId/status", (0, protectAdmin_1.checkAuths)(...Object.values(user_interface_1.Role)), booking_controller_1.bookingController.updateBooking);
exports.default = bookingRouter;
