import { Schema, model } from "mongoose";
const patientSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        fullName: { type: String, required: true, trim: true },
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
        mobile: { type: Number, required: true },
    },
    { timestamps: true }
);
export const PatientProfile = model("PatientProfile", patientSchema);
