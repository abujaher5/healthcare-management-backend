import { Router } from "express";
import { doctorController } from "./doctor.controller";

const router = Router();
router.get("/", doctorController.getAllDoctors);
router.get("/:doctorId", doctorController.getDoctorById);

export const doctorRoutes = router;
