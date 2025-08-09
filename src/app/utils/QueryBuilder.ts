import { Query } from "mongoose";
import { excludeFild } from "../modules/tours/tour.constain";

export class QueryBuilder<T> {
    public queryModel: Query<T[], T>;
    public query: Record<string, string>;

    constructor(queryModel: Query<T[], T>, query: Record<string, string>) {
        this.queryModel = queryModel;
        this.query = query
    };

    filter(): this {
        const filter = { ...this.query };

        for (const value of excludeFild) {
            delete filter[value];
        };

        this.queryModel = this.queryModel.find(filter);

        return this

    };

    search(searchableFild: string[]): this {

        const searchTerm = this.query.searchTerm || "";
        const searchQuery = {
            $or: searchableFild.map((fild) => ({ [fild]: { $regex: searchTerm, $options: "i" } }))
        };

        this.queryModel = this.queryModel.find(searchQuery);

        return this

    };

    sort(): this {
        const sort = this.query.sort || "-createdAt";
        this.queryModel = this.queryModel.sort(sort);
        return this;
    };
    select(): this {
        const fields = this.query.fields?.split(",").join(" ") || "";
        this.queryModel = this.queryModel.select(fields);
        return this;
    }


    paginate(): this {

        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;

        this.queryModel = this.queryModel.limit(limit).skip(skip);

        return this;
    };

    build() {
        return this.queryModel
    };

    async getMeta() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;

        const totalDocumtnt = await this.queryModel.model.countDocuments();
        const totalPage = Math.ceil(totalDocumtnt / limit);

        return { page, limit, total: totalDocumtnt, totalPage }

    }

}