import { Router } from "express";
import { getMedicalAnswer } from "../controllers/chatBot.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; // optional

const router = Router();

// Use JWT auth if you want only logged-in users to access
router.post("/", verifyJWT, getMedicalAnswer);

export default router;
