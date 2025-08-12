"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const division_controller_1 = require("./division.controller");
const protectAdmin_1 = require("../../middleware/protectAdmin");
const user_interface_1 = require("../users/user.interface");
const requestValidation_1 = require("../../utils/requestValidation");
const divition_Validation_1 = require("./divition.Validation");
const divisionRouter = (0, express_1.Router)();
// Create Division
divisionRouter.post("/create", (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), (0, requestValidation_1.validateRequest)(divition_Validation_1.createDivisionZodSchema), division_controller_1.divisionController.createDivision);
// Get All Division
divisionRouter.get("/", division_controller_1.divisionController.getAllDivision);
// Get Single Division
divisionRouter.get("/:slug", division_controller_1.divisionController.getSingleDivision);
// Update Division
divisionRouter.patch("/:id", (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), (0, requestValidation_1.validateRequest)(divition_Validation_1.updateDivisionZodSchema), division_controller_1.divisionController.updateDivisin);
// Delete Division
divisionRouter.delete("/:id", (0, protectAdmin_1.checkAuths)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), division_controller_1.divisionController.deleteDivision);
exports.default = divisionRouter;
