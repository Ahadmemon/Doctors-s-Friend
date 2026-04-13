import { Router } from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    updateProfile,
    getMe,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// router.route("/register").post( upload.fields([{ name: "profileImage", maxCount: 1 }]),registerUser);
router.post(
    "/register",
    // upload.fields([{ name: "profileImage", maxCount: 1 }]),
    registerUser
);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.patch("/updateProfile", verifyJWT, updateProfile);

router.get("/me", verifyJWT, getMe);
export default router;
