"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalerrorHandaler = void 0;
const env_1 = require("../config/env");
const app_error_1 = __importDefault(require("../errorHelpers/app.error"));
const handleDuplicateError_1 = require("../error/handleDuplicateError");
const handleCastError_1 = require("../error/handleCastError");
const handleValidationError_1 = require("../error/handleValidationError");
const handleZodError_1 = require("../error/handleZodError");
const globalerrorHandaler = (err, req, res, next) => {
    if (env_1.envVar.node_env === "development") {
        console.log(err);
    }
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSourse = [];
    // Mongoose Duplicate Error Handle
    if (err.code === 11000) {
        const simpliedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
    }
    // Mongoose Cast Error
    else if (err.name === "CastError") {
        const simpliedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
    }
    // Mongoose validation Error
    else if (err.name === "ValidationError") {
        const simpliedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
        errorSourse = simpliedError.errorSourse;
    }
    // Zod Error
    else if (err.name === "ZodError") {
        console.log("-------------------------");
        console.log(err.issues);
        const simpliedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
        errorSourse = simpliedError.errorSourse;
    }
    else if (err instanceof app_error_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({ success: false, message, errorSourse, err: env_1.envVar.node_env === "development" ? err : null, stack: env_1.envVar.node_env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null });
};
exports.globalerrorHandaler = globalerrorHandaler;
