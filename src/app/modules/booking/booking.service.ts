import AppError from "../../errorHelpers/app.error";
import { ISSL_commerz } from "../../SSL_commerz/SSL.commerz.interface";
import { sslServices } from "../../SSL_commerz/SSL.commerz.services";
import { generateTransectionId } from "../../utils/getTransectionId";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { Tour } from "../tours/tour.model";
import { User } from "../users/user.model";
import { IBooking, IBookingStatus } from "./booking.interface";
import { Booking } from "./booning.model";

interface PaymentIUser {
    _id: string,
    address: string,
    email: string,
    phone: string,
    name: string
}


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


        const updateBooking = await Booking.findByIdAndUpdate(booking[0]._id, { payment: payment[0]._id }, { new: true, runValidators: true, session }).populate("user", "name email phone address").populate("tour", "title constFrom startDate endDate").populate("payment");

        const userPopulated = updateBooking?.user as unknown as PaymentIUser;

        const paymentGet = await sslServices.SSL_payment({
            address: userPopulated.address,
            phone: userPopulated.phone,
            email: userPopulated.email,
            name: userPopulated.name,
            transectionId: transectionId,
            amount: totalAmount
        });

        await session.commitTransaction();
        session.endSession();

        return {
            booking: updateBooking,
            paymentUrl: paymentGet?.GatewayPageURL
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error
    }

};

const getAllBooking = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Booking.find(), query);
    const bookingSearchablseFilds = ["user", "tour", "payment"]

    const booking = await queryBuilder.filter().search(bookingSearchablseFilds).paginate().sort().select().build();

    const meta = await queryBuilder.getMeta();

    return { booking, meta };
};

const getUserBooking = async (userId: string) => {
    const getBooking = await Booking.find({ user: userId }).populate("tour").populate("payment")
    return getBooking
};

const updateBooking = async (bookingId : string, status : string) => {
    const updataBooking = await Booking.findByIdAndUpdate(bookingId , {status : status} , {new : true , runValidators : true});
    return updataBooking
}

const getSingleBooking = async (bookingId : string) => {
    const result = await Booking.findById(bookingId);
    return result;
};

export const bookingServices = {
    createBooking,
    getAllBooking,
    getUserBooking,
    updateBooking,
    getSingleBooking
}