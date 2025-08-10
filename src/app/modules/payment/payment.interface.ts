import { Types } from "mongoose";

export enum PAYMENT_STATUS{
    PAIN = "PAID",
    UNPAID = "UNPAID",
    CANCELED = "CANCELED",
    FAILED = "FAILED",
    REFUND = "REFUND"
};


export interface IPayment{
    booking : Types.ObjectId,
    transectionId : string,
    amount : number,
    paymentGetwayData? : any,
    invoiceUrl? : string,
    status : PAYMENT_STATUS
}