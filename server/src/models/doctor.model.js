import { Schema, model } from "mongoose";
const doctorSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        registrationNumber: {
            type: String,
            unique: true,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        specialty: {
            type: String,
            default: "General",
            trim: true,
        },
        qualification: {
            type: String,
            required: true,
            trim: true,
        },
        availableSlots: {
            type: [String], // e.g. ["09:00", "12:00", "15:00", "17:00"]
            default: ["09:00", "12:00", "15:00", "17:00"],
        },
    },
    { timestamps: true }
);
export const Doctor = model("Doctor", doctorSchema);
