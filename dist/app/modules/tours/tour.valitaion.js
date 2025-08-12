"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTourZodSchema = exports.updateTourZodValidation = exports.createTourValidation = void 0;
const zod_1 = require("zod");
exports.createTourValidation = zod_1.z.object({
    title: zod_1.z.string({ invalid_type_error: "Title must be string." }).optional(),
    description: zod_1.z.string({ invalid_type_error: "Description must be string" }).optional(),
    images: zod_1.z.array((0, zod_1.string)()).optional(),
    location: zod_1.z.string(),
    constFrom: zod_1.z.number().optional(),
    startDate: zod_1.z.date().optional(),
    endDate: zod_1.z.date().optional(),
    included: zod_1.z.array((0, zod_1.string)()).optional(),
    excluded: zod_1.z.array((0, zod_1.string)()).optional(),
    amenities: zod_1.z.array((0, zod_1.string)()).optional(),
    tourPlan: zod_1.z.array((0, zod_1.string)()).optional(),
    maxGuest: zod_1.z.number().optional(),
    minAge: zod_1.z.number().optional(),
    division: zod_1.z.string(),
    tourType: zod_1.z.string(),
    departureLocation: zod_1.z.string().optional(),
    arrivalLocation: zod_1.z.string().optional()
});
exports.updateTourZodValidation = zod_1.z.object({
    title: zod_1.z.string({ invalid_type_error: "Title must be string." }).optional(),
    description: zod_1.z.string({ invalid_type_error: "Description must be string" }).optional(),
    images: zod_1.z.array((0, zod_1.string)()).optional(),
    location: zod_1.z.string().optional(),
    constFrom: zod_1.z.number().optional(),
    startDate: zod_1.z.date().optional(),
    endDate: zod_1.z.date().optional(),
    included: zod_1.z.array((0, zod_1.string)()).optional(),
    excluded: zod_1.z.array((0, zod_1.string)()).optional(),
    amenities: zod_1.z.array((0, zod_1.string)()).optional(),
    tourPlan: zod_1.z.array((0, zod_1.string)()).optional(),
    maxGuest: zod_1.z.number().optional(),
    minAge: zod_1.z.number().optional(),
    division: zod_1.z.string().optional(),
    tourType: zod_1.z.string().optional(),
    departureLocation: zod_1.z.string().optional(),
    arrivalLocation: zod_1.z.string().optional()
});
exports.createTourZodSchema = zod_1.z.object({
    name: zod_1.z.string()
});
