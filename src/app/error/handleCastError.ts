import mongoose from "mongoose";


// Handle Cast Error
export const handleCastError = (err: mongoose.Error.CastError) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDb ObjectId"
    }
};