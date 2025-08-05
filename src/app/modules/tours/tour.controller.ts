import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { tourServices } from "./tour.services";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/app.error";

const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.tourType) {
        throw new AppError(404, "Tour Type Must be required");
    };

    if (!req.body.division) {
        throw new AppError(404, "Tour Division Must be Required");
    }

    const result = tourServices.createTour(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division Created Successfully!",
        data: result
    })
});








// Tour Type

const createTourType = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const tour = await tourServices.createTourType(req.body);

    sendResponse(res , {
        statusCode : 200,
        success : true,
        message : "Tour Create Success",
        data : tour
    })

});

const getAllTourType = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const getAllTourType = await tourServices.getAllTourType();

    sendResponse(res , {
        statusCode : 200,
        success : true,
        message : "All Tour Type Retrived Successfully!",
        data : getAllTourType.getAllTourType,
        meta : {
            total : getAllTourType.totalTourType
        }
    })
});

const updateTourType = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const {id} = req.params;
    const result = await tourServices.updateTourType(id , req.body);
     sendResponse(res , {
        statusCode : 200,
        success : true,
        message : "All Tour Type Retrived Successfully!",
        data : result
    })
});

const deleteTourType = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const {id} = req.params;
    await tourServices.deleteTourType(id);

    sendResponse(res , {
        statusCode : 200,
        success : true,
        message : "Tour Type Delete Successfully!",
        data : null
    })

})

export const tourController = {
    createTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
}