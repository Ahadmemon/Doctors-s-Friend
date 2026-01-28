import { Schema, model } from "mongoose";
const patientSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },
        age: { type: Number, required: true },
        contact: { type: Number, required: true },
        weight: { type: Number, required: true },
    },
    { timestamps: true }
);
export const Patient = model("Patient", patientSchema);
