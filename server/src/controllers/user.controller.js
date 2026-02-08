import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from ".././utils/ApiError.js";
import { ApiResponse } from ".././utils/ApiResponse.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
    const {
        fullName,
        email,
        password,
        contactNumber,
        role,
        registrationNumber,
    } = req.body;
    if (
        [
            fullName,
            email,
            password,
            contactNumber,
            role,
            registrationNumber,
        ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Sb fill kr, kanjoos!");
    }

    if (!["Doctor", "Patient"].includes(role)) {
        throw new ApiError(400, "Galat shaks");
        // return res.status(400).json({ message: "Galat shaks" });
    }
    const existingUser = await User.findOne({ $or: [{ fullName }, { email }] });
    if (existingUser) {
        throw new ApiError(409, "Wapas kyu register kr raha hai");
        // return res.status(400).json({ message: "Wapas kyu register kr raha hai" });
    }
    const user = await User.create({
        fullName,
        email,
        password,
        contactNumber,
        role,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(500, "Ruk jao sabr karo ho raha hai register");
    }
    if (role == "Doctor") {
        const doctor = await Doctor.create({
            user: user._id,
            registrationNumber: registrationNumber,
        });

        return res
            .status(201)
            .json(
                new ApiResponse(200, "Succesfully registered", { user, doctor })
            );
    }
});
// const loginUser = asyncHandler(async (req, res) => {
//     res.status(200).json({ message: "OK" });
// });
export { registerUser };
