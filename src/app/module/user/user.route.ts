import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
// import { checkAuth } from "../../middleware/checkAuth";
// import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-doctor",
  validateRequest(userValidation.createDoctorZodSchema),
  userController.createDoctor,
);
router.post(
  "/create-admin",
  validateRequest(userValidation.createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router;
