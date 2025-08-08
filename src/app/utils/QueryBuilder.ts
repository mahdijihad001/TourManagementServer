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

    }

}