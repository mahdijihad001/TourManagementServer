import { Router } from "express";
import { divisionController } from "./division.controller";
import { checkAuths } from "../../middleware/protectAdmin";
import { Role } from "../users/user.interface";
import { validateRequest } from "../../utils/requestValidation";
import { createDivisionZodSchema, updateDivisionZodSchema } from "./divition.Validation";

const divisionRouter = Router();

// Create Division
divisionRouter.post("/create" , checkAuths(Role.ADMIN , Role.SUPER_ADMIN) , validateRequest(createDivisionZodSchema) ,divisionController.createDivision);

// Get All Division
divisionRouter.get("/" ,divisionController.getAllDivision);

// Update Division
divisionRouter.patch("/:id" , checkAuths(Role.ADMIN , Role.SUPER_ADMIN) , validateRequest(updateDivisionZodSchema) ,divisionController.updateDivisin);

// Delete Division
divisionRouter.delete("/:id" , checkAuths(Role.ADMIN , Role.SUPER_ADMIN) , divisionController.deleteDivision)





export default divisionRouter;