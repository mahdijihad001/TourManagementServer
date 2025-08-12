"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDivisionZodSchema = exports.createDivisionZodSchema = void 0;
const zod_1 = require("zod");
exports.createDivisionZodSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: "Division name must be string" }).min(1, { message: "Division Name must be 1 character" }),
    thumbnail: zod_1.z.string().optional(),
    description: zod_1.z.string().optional()
});
exports.updateDivisionZodSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: "Division name must be string" }).min(1, { message: "Division Name must be 1 character" }).optional(),
    thumbnail: zod_1.z.string().optional(),
    description: zod_1.z.string().optional()
});
