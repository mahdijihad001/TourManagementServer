import { Router } from "express";
import { tourController } from "./tour.controller";
import { validateRequest } from "../../utils/requestValidation";
import { createTourZodSchema } from "./tour.valitaion";
import { checkAuths } from "../../middleware/protectAdmin";
import { Role } from "../users/user.interface";

const tourRoutes = Router();

//Tour

tourRoutes.post("/create" , validateRequest(createTourZodSchema) ,tourController.createTour)


// Tour Type

tourRoutes.post("/create-tour-type" , checkAuths(Role.ADMIN , Role.SUPER_ADMIN) , tourController.createTourType);
tourRoutes.get("/tour-types" , checkAuths(...Object.values(Role)) ,tourController.getAllTourType);
tourRoutes.patch("/tour-types/:id" , checkAuths(Role.ADMIN , Role.SUPER_ADMIN) , tourController.updateTourType);
tourRoutes.delete("/tour-types/:id" , checkAuths(Role.ADMIN , Role.SUPER_ADMIN) ,tourController.deleteTourType)



export default tourRoutes