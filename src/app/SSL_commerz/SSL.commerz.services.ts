import axios from "axios";
import { envVar } from "../config/env";
import { ISSL_commerz } from "./SSL.commerz.interface";
import AppError from "../errorHelpers/app.error";

const SSL_payment = async (payload: ISSL_commerz) => {
    try {
        const data = {
            total_amount: payload.amount,
            currency: 'BDT',
            tran_id: payload.transectionId, // use unique tran_id for each api call
            success_url: `http://localhost:3030/success?transectionId=${payload.transectionId}`,
            fail_url: `http://localhost:3030/fail?transectionId=${payload.transectionId}`,
            cancel_url: `http://localhost:3030/cancel?transectionId=${payload.transectionId}`,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: payload.phone,
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };


        const result = await axios({
            method: "POST",
            url: envVar.SSL_PAYMENT_API,
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        return result
    } catch (error) {
        console.log("SSL-Commerz Payment Error : " , error);
        throw new AppError(400 , "SSL-commarz Payment faild");
    }

}