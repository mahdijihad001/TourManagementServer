import { string, z } from "zod";

export const createTourValidation = z.object({
    title: z.string({ invalid_type_error: "Title must be string." }).optional(),
    description: z.string({ invalid_type_error: "Description must be string" }).optional(),
    images: z.array(string()).optional(),
    location: z.string(),
    constFrom: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    included: z.array(string()).optional(),
    excluded: z.array(string()).optional(),
    amenities: z.array(string()).optional(),
    tourPlan: z.array(string()).optional(),
    maxGuest: z.number().optional(),
    minAge: z.number().optional(),
    division: z.string(),
    tourType: z.string(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional()
});


export const updateTourZodValidation = z.object({
    title: z.string({ invalid_type_error: "Title must be string." }).optional(),
    description: z.string({ invalid_type_error: "Description must be string" }).optional(),
    images: z.array(string()).optional(),
    location: z.string().optional(),
    constFrom: z.number().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    included: z.array(string()).optional(),
    excluded: z.array(string()).optional(),
    amenities: z.array(string()).optional(),
    tourPlan: z.array(string()).optional(),
    maxGuest: z.number().optional(),
    minAge: z.number().optional(),
    division: z.string().optional(),
    tourType: z.string().optional(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional()
});

export const createTourZodSchema = z.object({
    name : z.string()
});