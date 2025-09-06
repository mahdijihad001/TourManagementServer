import { IBookingStatus } from "../booking/booking.interface";
import { Booking } from "../booking/booning.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const successPayment = async (query: Record<string, string>) => {
    const transection_id = query.transection_id;

    const session = await Booking.startSession();
    session.startTransaction();

    try {
        const updatePayment = await Payment.findOneAndUpdate({ transectionId: transection_id }, { status: PAYMENT_STATUS.PAIN }, { new: true, runValidators: true, session });

        await Booking.findByIdAndUpdate(updatePayment?.booking, { status: IBookingStatus.COMPLITE }, { new: true, runValidators: true, session });

        await session.commitTransaction();
        session.endSession();

        return { success: true, message: "Tour Payment Successfully." };
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        console.log("Tour payment faild", error.message);
        throw error
    };
};


const faildPayment = async (query: Record<string, string>) => {
    const transection_id = query.transection_id;

    const session = await Booking.startSession();
    session.startTransaction();

    try {
        const updatePayment = await Payment.findOneAndUpdate({ transectionId: transection_id }, { status: PAYMENT_STATUS.FAILED }, { new: true, runValidators: true, session });

        await Booking.findByIdAndUpdate(updatePayment?.booking, { status: IBookingStatus.FAILED }, { new: true, runValidators: true, session });

        await session.commitTransaction();
        session.endSession();

        return { success: false, message: "Tour Payment Faild." };
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        console.log("Tour payment faild", error.message);
        throw error
    };
};

const cancelPayment = async (query: Record<string, string>) => {
    const transection_id = query.transection_id;

    const session = await Booking.startSession();
    session.startTransaction();

    try {
        const updatePayment = await Payment.findOneAndUpdate({ transectionId: transection_id }, { status: PAYMENT_STATUS.CANCELED }, { new: true, runValidators: true, session });

        await Booking.findByIdAndUpdate(updatePayment?.booking, { status: IBookingStatus.CENCEL }, { new: true, runValidators: true, session });

        await session.commitTransaction();
        session.endSession();

        return { success: false, message: "Tour Payment cancel." };
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        console.log("Tour payment calcel", error.message);
        throw error
    };
}


export const paymentServices = {
    successPayment,
    faildPayment,
    cancelPayment
}