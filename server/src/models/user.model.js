import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// creating new Schema
const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [8, "Password must be atleast 8 characters long"],
            trim: true,
        },
        contactNumber: {
            type: String,
            // required: true,
        },
        qualification: {
            type: String,
            required: true,
            trim: true,
        },
        profileImage: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["Doctor", "Patient"],
            // required: true,
            // default: "Patient",
            trim: true,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);
// Before saving data do the below working
userSchema.pre("save", async function () {
    // Check whether password is modified or not:
    if (!this.isModified("password")) return null;
    // else part
    this.password = await bcrypt.hash(this.password, 10);
});
// Comparing password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};
// creating model form Schema mongoose.models says mongoose create model for user which is named as User and from create it from userSchema
export const User = model("User", userSchema);
