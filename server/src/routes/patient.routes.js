import { Router } from "express";
import {
    addPatient,
    fetchPatients,
    updatePatientDetails,
    deletePatient,
} from "../controllers/patient.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/addPatient", addPatient);
router.get("/fetchPatients", fetchPatients);
router.patch("/updatePatient/:id", updatePatientDetails); //use put when updating all fields or say when updating document
router.delete("/deletePatient/:id", deletePatient);
export default router;
