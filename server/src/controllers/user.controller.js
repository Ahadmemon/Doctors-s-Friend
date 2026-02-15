import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from ".././utils/ApiError.js";
import { ApiResponse } from ".././utils/ApiResponse.js";
import mongoose from "mongoose";

const options = {
    httpOnly: true,
    secure: false,
};
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        // Response status will be 500 as its server error that it cannot generate access or refresh token
        throw new ApiError(
            500,
            "Something went wrong while generating access or refresh token"
        );
    }
};
const registerUser = asyncHandler(async (req, res) => {
    const {
        fullName,
        email,
        password,
        // contactNumber,
        // role,
        registrationNumber,
    } = req.body;
    // if (
    //     [
    //         fullName,
    //         email,
    //         password,
    //         contactNumber,
    //         role,
    //         registrationNumber,
    //     ].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "Sb fill kr, kanjoos!");
    // }
    if (!fullName || !email || !password || !registrationNumber) {
        throw new ApiError("All fields required");
    }
    // if (!["Doctor", "Patient"].includes(role)) {
    //     throw new ApiError(400, "Galat shaks");
    //     // return res.status(400).json({ message: "Galat shaks" });
    // }
    const existingUser = await User.findOne({ $or: [{ fullName }, { email }] });
    const existingDoctor = await Doctor.findOne({ registrationNumber });

    if (existingUser || existingDoctor) {
        throw new ApiError(409, "Wapas kyu register kr raha hai");
        // return res.status(400).json({ message: "Wapas kyu register kr raha hai" });
    }

    const user = await User.create({
        fullName,
        email,
        password,
    });

    // const createdUser = await User.findById(user._id).select(
    //     "-password -refreshToken"
    // );
    // if (!createdUser) {
    //     throw new ApiError(500, "Ruk jao sabr karo ho raha hai register");
    // }

    const doctor = await Doctor.create({
        user: user._id,
        registrationNumber: registrationNumber,
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );
    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201, "Successfully registered", {
                user: user,
                doctor,
                accessToken,
                refreshToken,
            })
        );
});
const loginUser = asyncHandler(async (req, res) => {
    // fetch data from request body
    const { email, password } = req.body;
    // validate data
    if (!email || !password) {
        throw new ApiError(400, "All fields required");
    }
    // check credentials
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }
    // allow to login (Now comes access token and refresh token)
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "Successfully logged in", {
                user: loggedInUser,
                accessToken,
                refreshToken,
            })
        );
});
const updateProfile = asyncHandler(async (req, res) => {
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: updatedData,
        },
        { new: true }
    );
    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }
    res.json(new ApiResponse(200, "Successfully updated data", updatedUser));
});
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined },
        },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"));
});
export { registerUser, loginUser, logoutUser, updateProfile };
