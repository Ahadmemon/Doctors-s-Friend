import mongoose, { Schema } from "mongoose"

// creating new Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password must be of atleast characters"],
        trim: true
    },
    role: {
        type: String,
        enum: ["Doctor", "Patient"],
        required: true,
        default: "Doctor",
        trim: true
    }
}, { timestamps: true })

// creating model form Schema mongoose.models says mongoose create model for user which is named as User and from create it from userSchema
export const User = mongoose.model("User", userSchema) 