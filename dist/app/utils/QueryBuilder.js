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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const tour_constain_1 = require("../modules/tours/tour.constain");
class QueryBuilder {
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    ;
    filter() {
        const filter = Object.assign({}, this.query);
        for (const value of tour_constain_1.excludeFild) {
            delete filter[value];
        }
        ;
        this.queryModel = this.queryModel.find(filter);
        return this;
    }
    ;
    search(searchableFild) {
        const searchTerm = this.query.searchTerm || "";
        const searchQuery = {
            $or: searchableFild.map((fild) => ({ [fild]: { $regex: searchTerm, $options: "i" } }))
        };
        this.queryModel = this.queryModel.find(searchQuery);
        return this;
    }
    ;
    sort() {
        const sort = this.query.sort || "-createdAt";
        this.queryModel = this.queryModel.sort(sort);
        return this;
    }
    ;
    select() {
        var _a;
        const fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(",").join(" ")) || "";
        this.queryModel = this.queryModel.select(fields);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.queryModel = this.queryModel.limit(limit).skip(skip);
        return this;
    }
    ;
    build() {
        return this.queryModel;
    }
    ;
    getMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(this.query.page) || 1;
            const limit = Number(this.query.limit) || 10;
            const totalDocumtnt = yield this.queryModel.model.countDocuments();
            const totalPage = Math.ceil(totalDocumtnt / limit);
            return { page, limit, total: totalDocumtnt, totalPage };
        });
    }
}
exports.QueryBuilder = QueryBuilder;
