import { Router } from "express";
import { paymentController } from "./payment.controller";

const paymentRoute = Router();


paymentRoute.post("/success" , paymentController.successPayment)
paymentRoute.post("/fail" , paymentController.faildPayment)
paymentRoute.post("/cancel" , paymentController.cancelPayment)




export default paymentRoute