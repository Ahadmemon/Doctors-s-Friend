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
    },
    { timestamps: true }
);
export const Doctor = model("Doctor", doctorSchema);
