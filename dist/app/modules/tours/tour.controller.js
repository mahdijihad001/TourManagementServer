"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const tour_services_1 = require("./tour.services");
const sendResponse_1 = require("../../utils/sendResponse");
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const createTour = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.tourType) {
        throw new app_error_1.default(404, "Tour Type Must be required");
    }
    ;
    if (!req.body.division) {
        throw new app_error_1.default(404, "Tour Division Must be Required");
    }
    const result = tour_services_1.tourServices.createTour(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Division Created Successfully!",
        data: result
    });
}));
const getAllTour = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield tour_services_1.tourServices.getAllTour(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All Tour retrived successfully!",
        data: result.tours,
        meta: result.meta
    });
}));
const updateTour = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield tour_services_1.tourServices.updateTour(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Tour Updated successfully!",
        data: result
    });
}));
const deleteTour = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield tour_services_1.tourServices.deleteTour(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Tour deleted successfully!",
        data: null
    });
}));
// Tour Type
const createTourType = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = yield tour_services_1.tourServices.createTourType(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Tour Create Success",
        data: tour
    });
}));
const getAllTourType = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllTourType = yield tour_services_1.tourServices.getAllTourType();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All Tour Type Retrived Successfully!",
        data: getAllTourType.getAllTourType,
        meta: {
            total: getAllTourType.totalTourType
        }
    });
}));
const updateTourType = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield tour_services_1.tourServices.updateTourType(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All Tour Type Retrived Successfully!",
        data: result
    });
}));
const deleteTourType = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield tour_services_1.tourServices.deleteTourType(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Tour Type Delete Successfully!",
        data: null
    });
}));
exports.tourController = {
    createTour,
    getAllTour,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
};
