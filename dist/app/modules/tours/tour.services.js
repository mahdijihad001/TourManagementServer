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
exports.tourServices = void 0;
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const tour_constain_1 = require("./tour.constain");
const tour_model_1 = require("./tour.model");
// class PrcticesQueryBuilder<T> {
//     public queryModel: Query<T[], T>;
//     public readonly query: Record<string, string>;
//     constructor(queryModel: Query<T[], T>, query: Record<string, string>) {
//         this.queryModel = queryModel;
//         this.query = query
//     };
//     filter(): this {
//         const filter = { ...this.query };
//         for (const value of excludeFild) {
//             delete filter[value];
//         };
//         this.queryModel = this.queryModel.find(filter);
//         return this
//     };
//     search(): this {
//         const searchTerm = this.query.searchTerm || "";
//         const searchQuery = {
//             $or: tourSearchableFild.map((key) => ({ [key]: { $regex: searchTerm, $options: "i" } }))
//         };
//         this.queryModel = this.queryModel.find(searchQuery);
//         return this;
//     };
//     sort(): this {
//         const sort = this.query.sort || "-createdAt";
//         this.queryModel = this.queryModel.sort(sort);
//         return this
//     };
//     filds(): this {
//         const field = this.query.filds?.split(",").join(" ") || "";
//         this.queryModel = this.queryModel.select(field);
//         return this
//     };
//     paginate(): this {
//         const page = Number(this.query.page) || 1;
//         const limit = Number(this.query.limit) || 10;
//         const spip = (page - 1) * limit;
//         this.queryModel = this.queryModel.skip(spip).limit(limit);
//         return this;
//     }
//     build() {
//         return this.queryModel;
//     };
//     async getMeta() {
//         const totalData = await this.queryModel.model.countDocuments();
//         const page = Number(this.query.page) || 1;
//         const limit = Number(this.query.limit) || 10;
//         const totalPage = Math.ceil(totalData / limit)
//         return {total : totalData , page , limit , totalPage}
//     }
// }
// Create Tour
const createTour = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existTour = yield tour_model_1.Tour.findOne({ title: payload.title });
    if (existTour) {
        throw new Error("A tour with this title already exist!");
    }
    ;
    let baseSlug = (_a = payload.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-divison`;
    let counter = 0;
    while (yield tour_model_1.Tour.exists({ slug: slug })) {
        slug = `${slug}-${counter++}`;
    }
    payload.slug = slug;
    const tour = yield tour_model_1.Tour.create(payload);
    return tour;
});
// Get all Tour
const getAllTour = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(tour_model_1.Tour.find(), query);
    let tours = yield queryBuilder
        .filter().search(tour_constain_1.tourSearchableFild).select().sort().paginate().build();
    const meta = yield queryBuilder.getMeta();
    return {
        tours,
        meta
    };
});
// // Get all Tour
// const getAllTour = async (query: Record<string, string>) => {
//     const filter = query;
//     const sort = query.sort || "-createdAt"
//     const searchTerm = query.searchTerm || "";
//     const fields = query.fields?.split(",").join(" ") || "";
//     const page = Number(query.page) || 1;
//     const limit = Number(query.limit) || 10;
//     const skip = (page - 1) * limit;
//     for (var field of excludeFild) {
//         delete filter[field];
//     }
//     const queryFilter = {
//         $or: tourSearchableFild.map((key) => ({ [key]: { $regex: searchTerm, $options: "i" } }))
//     }
//     const totalTour = await Tour.countDocuments();
//     // const allTour = await Tour.find(queryFilter).find(filter).sort(sort).select(fields).limit(limit).skip(skip);
//     const queryfilter = Tour.find(filter);
//     const Tours = queryfilter.find(queryFilter);
//     const allTours = await Tours.sort(sort).select(fields).limit(limit).skip(skip);
//     const totalPage = Math.ceil(totalTour / limit);
//     const meta = {
//         total: totalTour,
//         page: page,
//         limit: limit,
//         totalPage
//     }
//     return {
//         allTours,
//         meta
//     }
// }
// Update Tour
const updateTour = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existTour = yield tour_model_1.Tour.findById(id);
    if (!existTour) {
        throw new app_error_1.default(404, "Tour not found!");
    }
    ;
    const checkName = yield tour_model_1.Tour.find({ title: payload.title });
    if (checkName) {
        throw new app_error_1.default(400, "A Tour already exist with thin title!");
    }
    ;
    if (payload.title) {
        const bastSlug = payload.title.split(" ").join("-");
        const slug = `${bastSlug}-tour`;
        let counter = 0;
        while (yield tour_model_1.Tour.exists({ slug: slug })) {
            payload.slug = `${bastSlug}-${counter++}`;
        }
    }
    ;
    const update = yield tour_model_1.Tour.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return update;
});
// Delete Tour
const deleteTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existTour = yield tour_model_1.Tour.findOne({ _id: id });
    if (!existTour) {
        throw new app_error_1.default(404, "Tour not exist!");
    }
    yield tour_model_1.Tour.findByIdAndDelete(id);
    return null;
});
// Create Tour Types
const createTourType = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existToyrType = yield tour_model_1.TourTypeModel.find({ name: payload.name });
    if (existToyrType) {
        throw new app_error_1.default(400, "A tour type name already exist!");
    }
    ;
    const tour = yield tour_model_1.TourTypeModel.create(payload);
    return tour;
});
const getAllTourType = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalTourType = yield tour_model_1.TourTypeModel.countDocuments();
    const getAllTourType = yield tour_model_1.TourTypeModel.find({});
    return {
        getAllTourType,
        totalTourType
    };
});
const updateTourType = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findTourType = yield tour_model_1.TourTypeModel.findById(id);
    if (!findTourType) {
        throw new app_error_1.default(404, "Tour type not found!");
    }
    ;
    const update = yield tour_model_1.TourTypeModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return update;
});
const deleteTourType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findTourType = yield tour_model_1.TourTypeModel.findById(id);
    if (!findTourType) {
        throw new app_error_1.default(404, "Tour type not found!");
    }
    ;
    yield tour_model_1.TourTypeModel.findByIdAndDelete(id);
    return null;
});
exports.tourServices = {
    createTour,
    getAllTour,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
};
