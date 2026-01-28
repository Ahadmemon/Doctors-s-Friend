import { Schema, model } from "mongoose";

const followUpSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: "PatientForm",
            required: true,
        },
        doctor: {
            type: Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        diseases: { type: [String], required: true },
        treatments: { type: String, required: true },
        notes: String,
        visitDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);
export const FollowUp = new model("FollowUp", followUpSchema);
