import AppError from "../../errorHelpers/app.error";
import { Division } from "./dividion.model";
import { IDivision } from "./division.interfaces";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { divisionSearchAbleFild } from "./division.constain";
import { deleteImageFormCloudinary } from "../../config/cloudinary.config";


const createDivision = async (payload: Partial<IDivision>, thumbnail: string) => {

    const existDivision = await Division.findOne({ name: payload.name });

    if (existDivision) {
        throw new Error("A division already exist with this name!");
    };

    // const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
    // let slug = `${baseSlug}-division`;

    // let counter = 0

    // while (await Division.exists({ slug: slug })) {
    //     slug = `${slug}-${counter++}`
    // }

    // payload.slug = slug

    const data = {
        ...payload,
        thumbnail: thumbnail
    }

    const division = await Division.create(data);
    return division
};


const getAllDivision = async (query: Record<string, string>) => {

    const searchTerm = query.searchTerm;
    console.log(searchTerm);

    delete query["searchTerm"];

    const baseQuery = new QueryBuilder(Division.find(), query);

    const division = await baseQuery
        .filter()
        .search(divisionSearchAbleFild)
        .sort()
        .select()
        .paginate()
        .build();

    // const division = await Division.find(query);
    // const totalDivision = await Division.countDocuments();
    // if (!division) {
    //     throw new AppError(404, "Division not available");
    // };

    const totalDivision = await baseQuery.getMeta();

    return {
        division,
        meta: totalDivision
    }
};

const getSingleDivision = async (slug: string) => {
    const findSlug = await Division.findOne({ slug: slug });
    if (!findSlug) {
        throw new AppError(404, "Division Not found!");
    };
    return findSlug;
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
    const findDivision = await Division.findById(id);

    if (!findDivision) {
        throw new AppError(404, "Divison not found!")
    };

    const duplicateDivision = await Division.find({ name: payload.name, _id: { $ne: id } });

    if (duplicateDivision.length > 0) {
        throw new AppError(400, "A division this name already hare.");
    };

    const update = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

    if (payload.thumbnail && findDivision.thumbnail) {
        await deleteImageFormCloudinary(findDivision.thumbnail);
    }

    return update
};

const deleteDivision = async (id: string) => {
    const find = await Division.findByIdAndDelete(id);
    await deleteImageFormCloudinary(find?.thumbnail as string);
    return null
}

export const divisionServices = {
    createDivision,
    getSingleDivision,
    getAllDivision,
    updateDivision,
    deleteDivision
}