import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const patientFormSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
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
        // diseases: {
        //     type: [String],
        //     required: true,
        //     trim: true,
        // },
        // treatments: {
        //     type: String,
        //     required: true,
        //     trim: true,
        // },
        age: { type: Number, required: true },
        contact: { type: Number, required: true },
        weight: { type: Number, required: true },
    },
    { timestamps: true }
);
patientFormSchema.plugin(mongooseAggregatePaginate);
export const PatientForm = model("PatientForm", patientFormSchema);
