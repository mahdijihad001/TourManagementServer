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
exports.divisionServices = void 0;
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const dividion_model_1 = require("./dividion.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const division_constain_1 = require("./division.constain");
const createDivision = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existDivision = yield dividion_model_1.Division.findOne({ name: payload.name });
    if (existDivision) {
        throw new Error("A division already exist with this name!");
    }
    ;
    // const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
    // let slug = `${baseSlug}-division`;
    // let counter = 0
    // while (await Division.exists({ slug: slug })) {
    //     slug = `${slug}-${counter++}`
    // }
    // payload.slug = slug
    const division = yield dividion_model_1.Division.create(payload);
    return division;
});
const getAllDivision = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = query.searchTerm;
    console.log(searchTerm);
    delete query["searchTerm"];
    const baseQuery = new QueryBuilder_1.QueryBuilder(dividion_model_1.Division.find(), query);
    const division = yield baseQuery
        .filter()
        .search(division_constain_1.divisionSearchAbleFild)
        .sort()
        .select()
        .paginate()
        .build();
    // const division = await Division.find(query);
    // const totalDivision = await Division.countDocuments();
    // if (!division) {
    //     throw new AppError(404, "Division not available");
    // };
    const totalDivision = yield baseQuery.getMeta();
    return {
        division,
        meta: totalDivision
    };
});
const getSingleDivision = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const findSlug = yield dividion_model_1.Division.findOne({ slug: slug });
    if (!findSlug) {
        throw new app_error_1.default(404, "Division Not found!");
    }
    ;
    return findSlug;
});
const updateDivision = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findDivision = yield dividion_model_1.Division.findById(id);
    if (!findDivision) {
        throw new app_error_1.default(404, "Divison not found!");
    }
    ;
    const duplicateDivision = yield dividion_model_1.Division.find({ name: payload.name, _id: { $ne: id } });
    if (duplicateDivision) {
        throw new app_error_1.default(400, "A division this name already hare.");
    }
    ;
    const update = yield dividion_model_1.Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return update;
});
const deleteDivision = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield dividion_model_1.Division.findByIdAndDelete(id);
    return null;
});
exports.divisionServices = {
    createDivision,
    getSingleDivision,
    getAllDivision,
    updateDivision,
    deleteDivision
};
