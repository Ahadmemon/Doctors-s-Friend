import { asyncHandler } from "../utils/asyncHandler.js";
import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// GET /api/notifications - Get all notifications for logged-in user
const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { isRead } = req.query;

    const query = { userId };
    if (isRead !== undefined) {
        query.isRead = isRead === "true";
    }

    const notifications = await Notification.find(query)
        .populate({
            path: "appointmentId",
            populate: {
                path: "doctorId",
                populate: { path: "user", select: "fullName email" },
            },
        })
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(
            200,
            "Notifications fetched successfully.",
            notifications
        )
    );
});

// GET /api/notifications/unread-count
const getUnreadCount = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const count = await Notification.countDocuments({ userId, isRead: false });

    res.status(200).json(
        new ApiResponse(200, "Unread count fetched.", { unreadCount: count })
    );
});

// PATCH /api/notifications/:id/read
const markAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOne({ _id: id, userId });
    if (!notification) {
        throw new ApiError(404, "Notification not found.");
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json(
        new ApiResponse(200, "Notification marked as read.", notification)
    );
});

// PATCH /api/notifications/mark-all-read
const markAllAsRead = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await Notification.updateMany({ userId, isRead: false }, { isRead: true });

    res.status(200).json(
        new ApiResponse(200, "All notifications marked as read.")
    );
});

// DELETE /api/notifications/:id
const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndDelete({
        _id: id,
        userId,
    });
    if (!notification) {
        throw new ApiError(404, "Notification not found.");
    }

    res.status(200).json(
        new ApiResponse(200, "Notification deleted successfully.")
    );
});

export {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
};
