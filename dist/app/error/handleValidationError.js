"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
// Handle Mongoose Validation Error
const handleValidationError = (err) => {
    const errorSourse = [];
    let errors = Object.values(err.errors);
    errors.forEach((errorObject) => errorSourse.push({
        path: errorObject.path,
        message: errorObject.message
    }));
    return {
        statusCode: 400,
        message: err.message,
        errorSourse
    };
};
exports.handleValidationError = handleValidationError;
