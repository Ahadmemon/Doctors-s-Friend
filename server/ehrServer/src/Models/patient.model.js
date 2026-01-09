import mongoose from "mongoose";
const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
export const Patient = mongoose.model("Patient", patientSchema);
