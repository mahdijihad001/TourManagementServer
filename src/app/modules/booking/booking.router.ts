import { Router } from "express";
import { bookingController } from "./booking.controller";
import { validateRequest } from "../../utils/requestValidation";
import { createBookingZodSchema } from "./bookingZodSchema";
import { checkAuths } from "../../middleware/protectAdmin";
import { Role } from "../users/user.interface";

const bookingRouter = Router();


// Create booking
bookingRouter.post("/" , checkAuths(...Object.values(Role)) ,validateRequest(createBookingZodSchema) ,bookingController.createBooking);

// Get All Booking => ADMIN & SUPER ADMIN
bookingRouter.get("/" , checkAuths(Role.ADMIN , Role.SUPER_ADMIN) , bookingController.getAllBooking);

// Get User Booking
bookingRouter.get("/myBooking" , checkAuths(...Object.values(Role)) , bookingController.getUserBooking);

// Get Single Booking
bookingRouter.get("/:bookingId" , checkAuths(...Object.values(Role)) , bookingController.getSingleBooking);

// Update Booking
bookingRouter.patch("/:bookingId/status" , checkAuths(...Object.values(Role)) , bookingController.updateBooking);

export default bookingRouter;