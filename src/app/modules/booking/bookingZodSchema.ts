import { z } from "zod";
import { IBookingStatus } from "./booking.interface";

export const createBookingZodSchema = z.object({
    tour : z.string(),
    guestCount : z.number().int().positive(),
});

export const updateBooningZodSchema = z.object({
    status : z.enum(Object.values(IBookingStatus) as [string])
});