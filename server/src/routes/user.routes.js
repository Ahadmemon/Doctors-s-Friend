import { Router } from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
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
export default router;
