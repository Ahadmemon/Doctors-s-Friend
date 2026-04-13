import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
} from "../controllers/appointment.controller.js";

const router = Router();

router.use(verifyJWT);

router.post("/", bookAppointment);
router.get("/my", getMyAppointments);
router.get("/doctor/my", getDoctorAppointments); // must be before /:id
router.patch("/:id/update-status", updateAppointmentStatus);

export default router;
