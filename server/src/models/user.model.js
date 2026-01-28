import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// creating new Schema
const userSchema = new Schema(
    {
        name: {
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
            minLength: [8, "Password must be of atleast characters"],
            trim: true,
        },
        contactNumber: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            enum: ["Doctor", "Patient"],
            required: true,
            default: "Doctor",
            trim: true,
        },
    },
    { timestamps: true }
);
// Before saving data do the below working
userSchema.pre("save", async function (next) {
    // Check whether password is modified or not:
    if (!this.isModified("password")) return next();
    // else part
    password = this.password;
    password = await bcrypt.hash(password, 10);
    next();
});
// Comparing password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
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
            name: this.name,
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
