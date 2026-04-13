import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from ".././utils/ApiError.js";
import { ApiResponse } from ".././utils/ApiResponse.js";

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
        throw new ApiError(
            500,
            "Something went wrong while generating access or refresh token"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    const user = await User.create({ fullName, email, password });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201, "Successfully registered", {
                user,
                accessToken,
                refreshToken,
            })
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }

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

// ✅ getMe is now a proper top-level function, not inside registerUser
const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-password -refreshToken"
    );
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.json(new ApiResponse(200, "User fetched successfully", { user }));
});

const updateProfile = asyncHandler(async (req, res) => {
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updatedData },
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
        { $set: { refreshToken: undefined } },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"));
});

export { registerUser, loginUser, logoutUser, updateProfile, getMe };
