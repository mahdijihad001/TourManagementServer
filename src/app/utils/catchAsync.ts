import { NextFunction, Request, Response } from "express";
import { envVar } from "../config/env";

type asyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const catchAsync = (fn: asyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error : any) => {
        next(error)
    })
}

export default catchAsync