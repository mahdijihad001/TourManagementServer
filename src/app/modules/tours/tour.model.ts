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
        unique: true
    },
    slug: {
        type: String,
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
        ref: "tourType",
        required: [true, "Tour type must be required"]
    }

}, { timestamps: true });

tourSchema.pre("save", async function (next) {
    if (this.isModified("title")) {
        let baseSlug = this.title.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}-tour`;
        let counter = 0
        while (await Tour.exists({ slug: slug })) {
            slug = `${slug}-${counter++}`;
        }
        this.slug = slug
    }

    next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {

    let tour = this.getUpdate() as Partial<ITour>;

    if (tour.title) {
        let baseSlug = tour.title.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}-tour`;
        let counter = 0;

        while (await Tour.exists({ slug: slug })) {
            slug = `${slug}-${counter++}`
        }
        tour.slug = slug
    }
    this.setUpdate(tour);
    next();
});



export const Tour = model<ITour>("Tour", tourSchema);


