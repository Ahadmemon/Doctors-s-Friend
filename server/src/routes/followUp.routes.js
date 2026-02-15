import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addFollowUp,
    fetchFollowUps,
    updateFollowUpData,
    deleteFollowUp,
} from "../controllers/followUp.controller.js";
const router = Router();

router.post("/addFollowUp/:id", verifyJWT, addFollowUp);
router.get("/fetchFollowUps/:id", verifyJWT, fetchFollowUps);
router.patch("/updateFollowUpData/:id", updateFollowUpData);
router.delete("/deleteFollowUp/:id", deleteFollowUp);
export default router;
