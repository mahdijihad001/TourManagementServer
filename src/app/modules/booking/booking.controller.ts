import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await bookingServices.createBooking(req.body , decodedToken.userID);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking Created SuccessfullY!",
        data: result
    })
});

const getAllBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await bookingServices.getAllBooking(query as Record<string , string>);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Booking Retrived SuccessfullY!",
        data: result.booking,
        meta : result.meta
    })
});

const getUserBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload
    const result = await bookingServices.getUserBooking(user._id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking Retrived SuccessfullY!",
        data: result
    })
});

const updateBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {bookingId} = req.params;
    const status = req.body.status
    const result = await bookingServices.updateBooking(bookingId , status);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking Update SuccessfullY!",
        data: result
    })
});

const getSingleBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {bookingId} = req.params;
    const result = await bookingServices.getSingleBooking(bookingId as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking Retrived SuccessfullY!",
        data: result
    })
});


export const bookingController = {
    createBooking,
    getAllBooking,
    getUserBooking,
    updateBooking,
    getSingleBooking
}