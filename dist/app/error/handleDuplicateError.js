"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
// Mongoose Duplicate Error handle
const handleDuplicateError = (err) => {
    let duplicate = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${duplicate[1]} already exist!`
    };
};
exports.handleDuplicateError = handleDuplicateError;
