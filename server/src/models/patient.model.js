import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { FollowUp } from "./followUp.model.js";
const patientSchema = new Schema(
    {
        doctor: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
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
        age: { type: String, required: true },
        contactNumber: { type: String, required: true },
        weight: { type: String, required: true },
    },
    { timestamps: true }
);
patientSchema.plugin(mongooseAggregatePaginate);
patientSchema.pre("findOneAndDelete", async function () {
    const patient = await this.model.findOne(this.getFilter());
    if (patient) {
        await FollowUp.deleteMany({ patient: patient._id });
    }
});
export const Patient = model("Patient", patientSchema);
