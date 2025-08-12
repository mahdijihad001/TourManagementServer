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
exports.divisionController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const division_services_1 = require("./division.services");
const sendResponse_1 = require("../../utils/sendResponse");
const createDivision = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const division = yield division_services_1.divisionServices.createDivision(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Division Create Successfully!",
        data: division
    });
}));
const getAllDivision = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const division = yield division_services_1.divisionServices.getAllDivision(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All Division retrived successfully!",
        data: division.division,
        meta: division.meta
    });
}));
const getSingleDivision = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const result = yield division_services_1.divisionServices.getSingleDivision(slug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Division Find Successfully!",
        data: result
    });
}));
const updateDivisin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = yield division_services_1.divisionServices.updateDivision(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Division Updated successfylly!",
        data: updateData
    });
}));
const deleteDivision = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield division_services_1.divisionServices.deleteDivision(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted successfylly!",
        data: null
    });
}));
exports.divisionController = {
    createDivision,
    getAllDivision,
    getSingleDivision,
    updateDivisin,
    deleteDivision
};
