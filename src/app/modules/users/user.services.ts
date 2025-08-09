import AppError from "../../errorHelpers/app.error";
import { IAuthprovider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVar } from "../../config/env";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFild } from "./user.constain";

const createuser = async (payload: Partial<IUser>) => {

    const { email, password, ...rest } = payload;

    const exixtUser = await User.findOne({ email });

    if (exixtUser) {
        throw new AppError(StatusCodes.BAD_REQUEST, "email already exist");
    };

    // const hashPassword = await bcrypt.hash(password as string, 10);

    const authProvider: IAuthprovider = { provider: "Credentials", prividerId: email as string }

    const user = await User.create({ email, password, auths: [authProvider], ...rest });
    return user;
};


const getAllUsers = async (query : Record<string , string>) => {
    // const user = await User.find({});
    // const total = await User.countDocuments();

    const queryBuilder = new QueryBuilder(User.find() , query);
    const user = await queryBuilder.filter().search(userSearchableFild).paginate().sort().select().build();
    const meta = await queryBuilder.getMeta();
    return {
        user,
        meta
    };
}

const updateUser = async (userId: string, payload: Partial<IUser>, decodecToken: JwtPayload) => {

    const existUser = await User.findById(userId);

    if (!existUser) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
    }
    if (payload.role) {
        if (decodecToken.payload.role === Role.USER || decodecToken.payload.role === Role.GUIDE) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
        }

        if (payload.role === Role.SUPER_ADMIN && decodecToken.payload.role === Role.ADMIN){
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized")
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerifid) {
        if (decodecToken.payload.role === Role.USER || decodecToken.payload.role === Role.GUIDE) {
            throw new AppError(StatusCodes.FORBIDDEN, "You cannot update account status!")
        }
    }

    // if (payload.password) {
    //     payload.password = await bcrypt.hash(payload.password, 10);
    // }

    const updateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return updateUser

};

export const seedSuperAdmin = async () => {
    const existSuperAdmin = await User.findOne({ email: envVar.SUPER_ADMIN_EMAIL });

    if (existSuperAdmin) {
        console.log("Super admin already exist!");
        return;
    }

    // const hastPassword = await bcrypt.hash(envVar.SUPER_ADMIN_PASSWORD, 10);

    const authProvider: IAuthprovider = {
        prividerId: envVar.SUPER_ADMIN_EMAIL,
        provider: "Credentials"
    }

    const payload: IUser = {
        name: "Super Admin",
        email: envVar.SUPER_ADMIN_EMAIL,
        password: envVar.SUPER_ADMIN_PASSWORD,
        role: Role.SUPER_ADMIN,
        isVerifid: true,
        auths: [authProvider]
    }

    await User.create(payload);
    console.log("Super admin created successfully");

};



export const userServices = {
    createuser,
    getAllUsers,
    updateUser
}