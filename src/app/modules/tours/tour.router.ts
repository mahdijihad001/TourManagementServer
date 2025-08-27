import { Router } from "express";
import { tourController } from "./tour.controller";
import { validateRequest } from "../../utils/requestValidation";
import { createTourValidation, updateTourZodValidation } from "./tour.valitaion";
import { checkAuths } from "../../middleware/protectAdmin";
import { Role } from "../users/user.interface";
import { multerUpload } from "../../config/multer.config";

const tourRoutes = Router();

//Tour

tourRoutes.post("/create", multerUpload.array("files"), checkAuths(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourValidation), tourController.createTour);
tourRoutes.get("/", tourController.getAllTour);
tourRoutes.patch("/:id", checkAuths(Role.ADMIN, Role.SUPER_ADMIN), multerUpload.array("files") ,validateRequest(updateTourZodValidation), tourController.updateTour);
tourRoutes.delete("/:id", checkAuths(Role.ADMIN, Role.SUPER_ADMIN), tourController.deleteTour);

// Tour Type

tourRoutes.post("/create-tour-type", checkAuths(Role.ADMIN, Role.SUPER_ADMIN), tourController.createTourType);
tourRoutes.get("/tour-types", checkAuths(...Object.values(Role)), tourController.getAllTourType);
tourRoutes.patch("/tour-types/:id", checkAuths(Role.ADMIN, Role.SUPER_ADMIN), tourController.updateTourType);
tourRoutes.delete("/tour-types/:id", checkAuths(Role.ADMIN, Role.SUPER_ADMIN), tourController.deleteTourType)



export default tourRoutes