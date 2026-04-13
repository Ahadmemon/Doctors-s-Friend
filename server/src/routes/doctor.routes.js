import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    fetchAllDoctors,
    fetchDoctorById,
    updateDoctor,
} from "../controllers/doctor.controller.js";

const router = Router();

// Public
router.get("/fetchAllDoctors", fetchAllDoctors);
router.get("/:id", fetchDoctorById);

// Protected — doctor updates their own profile
router.patch(
    "/updateDoctor/:id",
    verifyJWT,
    upload.single("profilePic"),
    updateDoctor
);

export default router;
