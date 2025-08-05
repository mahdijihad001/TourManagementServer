import { z } from "zod";

export const createDivisionZodSchema = z.object({
    name: z.string({ invalid_type_error: "Division name must be string" }).min(1, { message: "Division Name must be 1 character" }),
    thumbnail: z.string().optional(),
    description: z.string().optional()
});

export const updateDivisionZodSchema = z.object({
    name: z.string({ invalid_type_error: "Division name must be string" }).min(1, { message: "Division Name must be 1 character" }).optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional()
})