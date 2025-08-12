"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const payment_interface_1 = require("../payment/payment.interface");
const payment_model_1 = require("../payment/payment.model");
const tour_model_1 = require("../tours/tour.model");
const user_model_1 = require("../users/user.model");
const booking_interface_1 = require("./booking.interface");
const booning_model_1 = require("./booning.model");
const generateTransectionId = () => {
    const result = `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return result;
};
const createBooking = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transectionId = generateTransectionId();
    const session = yield booning_model_1.Booking.startSession();
    session.startTransaction();
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!(user === null || user === void 0 ? void 0 : user.phone) || !(user === null || user === void 0 ? void 0 : user.address)) {
            throw new app_error_1.default(400, "Please update your profile information phone number & address");
        }
        ;
        const tour = yield tour_model_1.Tour.findById(payload.tour).select("constFrom");
        if (!(tour === null || tour === void 0 ? void 0 : tour.constFrom)) {
            throw new app_error_1.default(400, "Tour const not found!");
        }
        const totalAmount = Number(tour.constFrom) * Number(payload.guestCount);
        const booking = yield booning_model_1.Booking.create([Object.assign({ user: userId, status: booking_interface_1.IBookingStatus.PENDING }, payload)], { session });
        const payment = yield payment_model_1.Payment.create([{
                booking: booking[0]._id,
                transectionId: transectionId,
                status: payment_interface_1.PAYMENT_STATUS.UNPAID,
                amount: totalAmount
            }], { session });
        const updateBooking = yield booning_model_1.Booking.findByIdAndUpdate(booking[0]._id, { payment: payment[0]._id }, { new: true, runValidators: true, session }).populate("user", "name email phone").populate("tour", "title constFrom startDate endDate").populate("payment");
        yield session.commitTransaction();
        session.endSession();
        return updateBooking;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
const getUserBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
const updateBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
const getSingleBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
exports.bookingServices = {
    createBooking,
    getAllBooking,
    getUserBooking,
    updateBooking,
    getSingleBooking
};
