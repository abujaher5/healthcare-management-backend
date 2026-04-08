import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-doctor",
  validateRequest(userValidation.createDoctorZodSchema),
  userController.createDoctor,
);
router.post(
  "/create-admin",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(userValidation.createAdminValidationSchema),
  userController.createAdmin,
);
router.post(
  "/create-super-admin",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(userValidation.createSuperAdminValidationSchema),
  userController.createSuperAdmin,
);

export const userRoutes = router;
