import AppError from "../../errorHelpers/app.error";
import { generateTransectionId } from "../../utils/getTransectionId";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { Tour } from "../tours/tour.model";
import { User } from "../users/user.model";
import { IBooking, IBookingStatus } from "./booking.interface";
import { Booking } from "./booning.model";


// Jihadanu1@
const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transectionId = generateTransectionId();

    const session = await Booking.startSession();
    session.startTransaction();

    try {

        const user = await User.findById(userId);

        if (!user?.phone || !user?.address) {
            throw new AppError(400, "Please update your profile information phone number & address");
        };

        const tour = await Tour.findById(payload.tour).select("constFrom");

        if (!tour?.constFrom) {
            throw new AppError(400, "Tour const not found!");
        }

        const totalAmount = Number(tour.constFrom) * Number(payload.guestCount);

        const booking = await Booking.create([{
            user: userId,
            status: IBookingStatus.PENDING,
            ...payload
        }], { session });

        const payment = await Payment.create([{
            booking: booking[0]._id,
            transectionId: transectionId,
            status: PAYMENT_STATUS.UNPAID,
            amount: totalAmount
        }], { session })


        const updateBooking = await Booking.findByIdAndUpdate(booking[0]._id, { payment: payment[0]._id }, { new: true, runValidators: true, session }).populate("user" , "name email phone").populate("tour" , "title constFrom startDate endDate").populate("payment");


        await session.commitTransaction();
        session.endSession();

        return updateBooking;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error
    }

};

const getAllBooking = async () => {
    return {};
};

const getUserBooking = async () => {
    return {};
};

const updateBooking = async () => {
    return {};
}

const getSingleBooking = async () => {
    return {};
};

export const bookingServices = {
    createBooking,
    getAllBooking,
    getUserBooking,
    updateBooking,
    getSingleBooking
}