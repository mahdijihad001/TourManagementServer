import AppError from "../../errorHelpers/app.error";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourTypeModel } from "./tour.model";
// Create Tour
const createTour = async (payload: Partial<ITour>) => {

    const existTour = await Tour.findOne({ title: payload.title });

    if (existTour) {
        throw new Error("A tour with this title already exist!");
    };

    let baseSlug = payload.title?.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-divison`

    let counter = 0;

    while (await Tour.exists({ slug: slug })) {
        slug = `${slug}-${counter++}`
    }

    payload.slug = slug

    const tour = await Tour.create(payload)

    return tour

};








// Create Tour Types

const createTourType = async (payload: Partial<ITourType>) => {
    const existToyrType = await TourTypeModel.find({ name: payload.name });
    if (existToyrType) {
        throw new AppError(400, "A tour type name already exist!");
    };
    const tour = await TourTypeModel.create(payload);
    return tour
};

const getAllTourType = async () => {
    const totalTourType = await TourTypeModel.countDocuments();
    const getAllTourType = await TourTypeModel.find({});

    return {
        getAllTourType,
        totalTourType
    }
}

const updateTourType = async (id: string, payload: Partial<ITourType>) => {
    const findTourType = await TourTypeModel.findById(id);
    if (!findTourType) {
        throw new AppError(404, "Tour type not found!")
    };
    const update = await TourTypeModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return update
};

const deleteTourType = async (id: string) => {
    const findTourType = await TourTypeModel.findById(id);
    if (!findTourType) {
        throw new AppError(404, "Tour type not found!")
    };
    await TourTypeModel.findByIdAndDelete(id);
    return null;
}

export const tourServices = {
    createTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
}