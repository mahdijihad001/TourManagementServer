import { deleteImageFormCloudinary } from "../../config/cloudinary.config";
import AppError from "../../errorHelpers/app.error";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { excludeFild, tourSearchableFild } from "./tour.constain";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourTypeModel } from "./tour.model";
import { Query } from "mongoose";


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



// Get all Tour
const getAllTour = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(Tour.find(), query);

    let tours = await queryBuilder
        .filter().search(tourSearchableFild).select().sort().paginate().build();
    const meta = await queryBuilder.getMeta();

    return {
        tours,
        meta
    }
}
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
const updateTour = async (id: string, payload: Partial<ITour>) => {
    const existTour = await Tour.findById(id);

    if (!existTour) {
        throw new AppError(404, "Tour not found!");
    };

    const checkName = await Tour.find({ title: payload.title });

    if (checkName) {
        throw new AppError(400, "A Tour already exist with thin title!");
    };

    if (payload.title) {
        const bastSlug = payload.title.split(" ").join("-");
        const slug = `${bastSlug}-tour`;

        let counter = 0;

        while (await Tour.exists({ slug: slug })) {
            payload.slug = `${bastSlug}-${counter++}`
        }

    };

    if (payload.images && payload.images.length > 0 && existTour.images && existTour.images.length > 0) {
        payload.images = [...new Set([...payload.images, ...existTour.images])]
    };

    if (payload.deletedImages && payload.deletedImages.length > 0 && existTour.images && existTour.images.length > 0) {
        const restDbImages = existTour.images.filter((image) => !payload.deletedImages?.includes(image));

        const updatedPayloadImages = (payload.images || [])
            .filter((images) => !payload.deletedImages?.includes(images));

        payload.images = [...new Set([...restDbImages, ...updatedPayloadImages])];
    }

    const update = await Tour.findByIdAndUpdate(id, payload, { new: true, runValidators: true });


    if (payload.deletedImages && payload.deletedImages.length > 0 && existTour.images && existTour.images.length > 0){
        await Promise.all(payload.deletedImages.map((url) => deleteImageFormCloudinary(url)));
    };

    return update

}

// Delete Tour

const deleteTour = async (id: string) => {
    const existTour = await Tour.findOne({ _id: id });

    if (!existTour) {
        throw new AppError(404, "Tour not exist!");
    }

    await Tour.findByIdAndDelete(id);

    return null
}

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
    getAllTour,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
}