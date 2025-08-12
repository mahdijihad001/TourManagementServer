"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tour_controller_1 = require("./tour.controller");
const requestValidation_1 = require("../../utils/requestValidation");
const tour_valitaion_1 = require("./tour.valitaion");
const protectAdmin_1 = require("../../middleware/protectAdmin");
const user_interface_1 = require("../users/user.interface");
const tourRoutes = (0, express_1.Router)();
//Tour
tourRoutes.post("/create", (0, requestValidation_1.validateRequest)(tour_valitaion_1.createTourZodSchema), (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.tourController.createTour);
tourRoutes.get("/", tour_controller_1.tourController.getAllTour);
tourRoutes.patch("/:id", (0, requestValidation_1.validateRequest)(tour_valitaion_1.updateTourZodValidation), (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.tourController.updateTour);
tourRoutes.delete("/:id", (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.tourController.deleteTour);
// Tour Type
tourRoutes.post("/create-tour-type", (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.tourController.createTourType);
tourRoutes.get("/tour-types", (0, protectAdmin_1.checkAuths)(...Object.values(user_interface_1.Role)), tour_controller_1.tourController.getAllTourType);
tourRoutes.patch("/tour-types/:id", (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.tourController.updateTourType);
tourRoutes.delete("/tour-types/:id", (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.tourController.deleteTourType);
exports.default = tourRoutes;
