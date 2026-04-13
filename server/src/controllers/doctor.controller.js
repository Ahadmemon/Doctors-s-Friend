import { asyncHandler } from "../utils/asyncHandler.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// GET /api/doctors
const fetchAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find().populate("user", "fullName email");

    if (!doctors.length) {
        throw new ApiError(404, "No doctors found.");
    }

    res.status(200).json(
        new ApiResponse(200, "Doctors fetched successfully.", doctors)
    );
});

// GET /api/doctors/:id
const fetchDoctorById = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id).populate(
        "user",
        "fullName email"
    );

    if (!doctor) {
        throw new ApiError(404, "Doctor not found.");
    }

    res.status(200).json(
        new ApiResponse(200, "Doctor fetched successfully.", doctor)
    );
});

// PATCH /api/doctors/updateDoctor/:id
// Logged-in doctor updates their own profile (registration, qualification, slots, profilePic)
const updateDoctor = asyncHandler(async (req, res) => {
    const id = req.user._id;

    const {
        registrationNumber,
        qualification,
        mobileNumber,
        availableSlots,
        specialty,
        address,
    } = req.body || {};

    const updateData = {};
    if (registrationNumber !== undefined)
        updateData.registrationNumber = registrationNumber;
    if (qualification !== undefined) updateData.qualification = qualification;
    if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
    if (address !== undefined) updateData.address = address;
    if (availableSlots !== undefined)
        updateData.availableSlots = availableSlots;
    if (specialty !== undefined) updateData.specialty = specialty;

    // If image uploaded via multer
    if (req.file) {
        updateData.profilePic = req.file.path;
    }

    let doctor = await Doctor.findOne({ user: id });

    if (!doctor) {
        // Create doctor profile if it doesn't exist yet
        doctor = await Doctor.create({ user: id, ...updateData });
    } else {
        doctor = await Doctor.findOneAndUpdate({ user: id }, updateData, {
            new: true,
            runValidators: true,
        });
    }

    await doctor.populate("user", "fullName email");

    res.status(200).json(
        new ApiResponse(200, "Doctor profile updated successfully.", doctor)
    );
});

export { fetchAllDoctors, fetchDoctorById, updateDoctor };
