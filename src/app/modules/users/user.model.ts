import mongoose, { model } from "mongoose";
import { IAuthprovider, IsActive, IUser, Role } from "./user.interface";
import bcrypt from "bcrypt";

const authProviderSchema = new mongoose.Schema<IAuthprovider>({
    provider: {
        type: String,
        required: true
    },
    prividerId: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    _id: false
})

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    phone: {
        type: String
    },
    picture: {
        type: String
    },
    address: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    isVerifid: {
        type: Boolean,
        default: false
    },
    auths: [authProviderSchema]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password as string, 10);
    next();
})

export const User = model<IUser>("user", userSchema);