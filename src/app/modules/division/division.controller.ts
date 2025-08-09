import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { divisionServices } from "./division.services";
import { sendResponse } from "../../utils/sendResponse";


const createDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const division = await divisionServices.createDivision(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division Create Successfully!",
        data: division
    })

});

const getAllDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const division = await divisionServices.getAllDivision(query as Record<string , string>);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Division retrived successfully!",
        data: division.division,
        meta: division.meta
    })
});

const getSingleDivision = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const slug = req.params.slug;
    const result = await divisionServices.getSingleDivision(slug);

    sendResponse(res , {
        statusCode : 200,
        success : true,
        message : "Division Find Successfully!",
        data : result
    })
})

const updateDivisin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = await divisionServices.updateDivision(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division Updated successfylly!",
        data: updateData
    })
})
const deleteDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await divisionServices.deleteDivision(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted successfylly!",
        data: null
    })
})

export const divisionController = {
    createDivision,
    getAllDivision,
    getSingleDivision,
    updateDivisin,
    deleteDivision
}