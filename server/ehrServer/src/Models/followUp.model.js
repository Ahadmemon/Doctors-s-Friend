import mongoose from "mongoose";
import { Patient } from "./patient.model";
const followUpSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    diseases: { type: [String], required: true },
    treatments: { type: [String], required: true },
    notes: String,
    visitDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
export const FollowUp = mongoose.model("FollowUp", followUpSchema);
