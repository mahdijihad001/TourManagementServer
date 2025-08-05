import mongoose from "mongoose";
import { IErrorSourse } from "../interfaces/errorTypes";

// Handle Mongoose Validation Error
export const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const errorSourse: IErrorSourse[] = []
    let errors = Object.values(err.errors);

    errors.forEach((errorObject: any) => errorSourse.push({
        path: errorObject.path,
        message: errorObject.message
    }));
    return {
        statusCode: 400,
        message: err.message,
        errorSourse
    }
};