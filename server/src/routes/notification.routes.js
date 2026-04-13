import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../controllers/notification.controller.js";

const router = Router();

// All routes require login
router.use(verifyJWT);

router.get("/", getNotifications);
router.get("/unread-count", getUnreadCount);
router.patch("/:id/read", markAsRead);
router.patch("/mark-all-read", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
