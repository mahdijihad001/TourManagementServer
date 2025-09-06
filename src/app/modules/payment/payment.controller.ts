import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentServices } from "./paymentservice";
import { envVar } from "../../config/env";

const successPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await paymentServices.successPayment(query as Record<string, string>);

    if (result.success) {
        res.redirect(`${envVar.SSL_CLINT_SUCCESS_URL}?transection_id=${query.transection_id}&amount=${query.amount}&status=${query.status}`);
    }

})
const faildPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await paymentServices.faildPayment(query as Record<string, string>);

    if (!result.success) {
        res.redirect(`${envVar.SSL_CLINT_FAIL_URL}?transection_id=${query.transection_id}&amount=${query.amount}&status=${query.status}`);
    }
})
const cancelPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await paymentServices.cancelPayment(query as Record<string, string>);

    if (!result.success) {
        res.redirect(`${envVar.SSL_CLINT_CANCEL_URL}?transection_id=${query.transection_id}&amount=${query.amount}&status=${query.status}`);
    }
});



export const paymentController = {
    successPayment,
    faildPayment,
    cancelPayment
}