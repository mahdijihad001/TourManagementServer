"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
// Handle Cast Error
const handleCastError = (err) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDb ObjectId"
    };
};
exports.handleCastError = handleCastError;
