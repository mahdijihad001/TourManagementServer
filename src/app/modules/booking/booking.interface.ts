import { Types } from "mongoose";

export enum IBookingStatus{
    PENDING = "PENDING",
    FAILED = "FAILED",
    CENCEL = "CENCEL",
    COMPLITE = "COMPLITE"
}

export interface IBooking{
    user : Types.ObjectId;
    tour : Types.ObjectId;
    payment? : Types.ObjectId;
    guestCount : number;
    status : IBookingStatus
}