import { Types } from "mongoose";
import AppError from "../../errorHelpers/app.error";
import { Division } from "./dividion.model"
import { IDivision } from "./division.interfaces"


const createDivision = async (payload: Partial<IDivision>) => {
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

    const division = await Division.create(payload);
    return division
};


const getAllDivision = async (query : Record<string , string>) => {
    const division = await Division.find(query);
    const totalDivision = await Division.countDocuments();
    if (!division) {
        throw new AppError(404, "Division not available");
    };

    return {
        division,
        meta: {
            total: totalDivision
        }
    }
}

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
    const findDivision = await Division.findById(id);

    if (!findDivision) {
        throw new AppError(404, "Divison not found!")
    };

    const duplicateDivision = await Division.find({ name: payload.name, _id: { $ne: id } });

    if (duplicateDivision) {
        throw new AppError(400, "A division this name already hare.");
    };

    const update = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

    return update
};

const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);
    return null
}

export const divisionServices = {
    createDivision,
    getAllDivision,
    updateDivision,
    deleteDivision
}