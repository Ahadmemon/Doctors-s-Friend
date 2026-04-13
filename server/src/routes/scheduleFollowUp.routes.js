import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    scheduleFollowUp,
    getDoctorFollowUps,
    getPatientFollowUps,
} from "../controllers/followUp.controller.js";

const router = express.Router();

// All routes require authentication
router.use(verifyJWT);

// Doctor schedules follow-up
router.post("/scheduleFollowUp", scheduleFollowUp);

// Doctor views all their follow-ups
router.get("/doctor", getDoctorFollowUps);

// Patient views their follow-ups
router.get("/patient", getPatientFollowUps);

export default router;
