import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
    {
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: String, // "YYYY-MM-DD"
            required: true,
        },
        time: {
            type: String, // "HH:MM"
            required: true,
        },
        reason: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
);

// DB-level guard against double-booking the same slot
appointmentSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

export const Appointment = model("Appointment", appointmentSchema);
