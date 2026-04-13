import { Schema, model } from "mongoose";
import { Patient } from "./patient.model.js";
import { User } from "./user.model.js";

const followUpSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        doctor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: { type: String, required: true },

        time: { type: String, required: true },
        reason: { type: String, default: "" },
    },
    { timestamps: true }
);

export const ScheduleFollowUp = model("ScheduleFollowUp", followUpSchema);
