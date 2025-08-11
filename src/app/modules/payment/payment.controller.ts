import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingServices.createBooking();
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking Created SuccessfullY!",
        data: result
    })
});

const getAllpayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingServices.getAllBooking();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Booking Retrived SuccessfullY!",
        data: result
    })
});

const getUserPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingServices.getUserBooking();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking Retrived SuccessfullY!",
        data: result
    })
});

const updatePayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingServices.updateBooking();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking Update SuccessfullY!",
        data: result
    })
});

const deletePayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await bookingServices.deleteBooking();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking Deleted SuccessfullY!",
        data: null
    })
});


export const paymentController = {
    createPayment,
    getAllpayment,
    getUserPayment,
    updatePayment,
    deletePayment
}