import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { doctorValidation } from "./doctor.validation";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();
router.get(
  "/",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR),
  doctorController.getAllDoctors,
);
router.get(
  "/:doctorId",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR),
  doctorController.getDoctorById,
);

router.patch(
  "/:doctorId",
  checkAuth("ADMIN", "SUPER_ADMIN", "DOCTOR"),
  validateRequest(doctorValidation.updateDoctorValidationSchema),
  doctorController.updateDoctor,
);

export const doctorRoutes = router;
