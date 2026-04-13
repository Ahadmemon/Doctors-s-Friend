import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },
        type: {
            type: String,
            enum: [
                "appointment_request",
                "appointment_confirmed",
                "appointment_cancelled",
            ],
            default: "appointment_request",
        },
        title: String,
        message: String,
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Index for faster queries
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ appointmentId: 1 });

export const Notification = model("Notification", notificationSchema);
