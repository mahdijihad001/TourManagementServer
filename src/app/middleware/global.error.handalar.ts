import { NextFunction, Request, Response } from "express"
import { envVar } from "../config/env"
import AppError from "../errorHelpers/app.error";
import { handleDuplicateError } from "../error/handleDuplicateError";
import { handleCastError } from "../error/handleCastError";
import { handleValidationError } from "../error/handleValidationError";
import { handleZodError } from "../error/handleZodError";
import { deleteImageFormCloudinary } from "../config/cloudinary.config";


export const globalerrorHandaler = async(err: any, req: Request, res: Response, next: NextFunction) => {

    if(envVar.node_env === "development"){
        console.log(err)
    };

    if(req.file){
        await deleteImageFormCloudinary(req.file.path);
    };

    if(req.files && Array.isArray(req.files) && req.files.length){
        const imageUrl = (req.files as Express.Multer.File[]).map((data) => data.path);

        await Promise.all(imageUrl.map((url) => deleteImageFormCloudinary(url)))

    }

    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSourse: any = [];

    // Mongoose Duplicate Error Handle
    if (err.code === 11000) {
        const simpliedError = handleDuplicateError(err);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message
    }
    // Mongoose Cast Error
    else if (err.name === "CastError") {
        const simpliedError = handleCastError(err)
        statusCode = simpliedError.statusCode;
        message = simpliedError.message
    }

    // Mongoose validation Error
    else if (err.name === "ValidationError") {
        const simpliedError = handleValidationError(err);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
        errorSourse = simpliedError.errorSourse

    }

    // Zod Error
    else if (err.name === "ZodError") {
        const simpliedError = handleZodError(err);
        statusCode = simpliedError.statusCode;
        message = simpliedError.message;
        errorSourse = simpliedError.errorSourse
    }

    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }

    res.status(statusCode).json({ success: false, message, errorSourse, err : envVar.node_env === "development" ? err : null, stack: envVar.node_env === "development" ? err?.stack : null })
}