import { Types } from "mongoose";

export interface ITourType{
    name : String
}

export interface ITour{
    title : string,
    slug : string,
    description ?: string,
    image ?: string[],
    location ?: string,
    constFrom ?: number,
    startDate ?: Date,
    endDate ?: Date,
    included ?: string[],
    excluded : string[],
    amenities ?: string[],
    tourPlan ?: string[],
    maxGuest ?: number,
    minAge ?: number,
    division : Types.ObjectId,
    tourType : Types.ObjectId
}