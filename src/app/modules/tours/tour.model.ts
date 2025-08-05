import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

const tourTypeSchema = new Schema<ITourType>({
    name: {
        type: String,
        required: [true, "Tour type name must be required!"],
        unique: true
    }
}, { timestamps: true });


export const TourTypeModel = model<ITourType>("tourType", tourTypeSchema)

const tourSchema = new Schema<ITour>({
    title: {
        type: String,
        required: [true, "Tour Title must be required!"],
        unique : true
    },
    slug: {
        type: String,
        required: [true, "Tour slug must be required!"],
        unique: true
    },
    description: {
        type: String
    },
    images: {
        type: [String],
        default: []
    },
    location: {
        type: String
    },
    constFrom: {
        type: Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    included: {
        type: [String],
        default: []
    },
    excluded: {
        type: [String],
        default: []
    },
    amenities: {
        type: [String],
        default: []
    },
    tourPlan: {
        type: [String],
        default: []
    },
    maxGuest: {
        type: Number
    },
    minAge: {
        type: Number
    },
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division",
        required: [true, "Division must be required"]
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref : "tourType",
        required : [true , "Tour type must be required"]
    }

}, { timestamps: true });

export const Tour = model<ITour>("Tour" , tourSchema);