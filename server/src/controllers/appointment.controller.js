import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// BOOK
const bookAppointment = asyncHandler(async (req, res) => {
    const { doctorId, date, time, reason } = req.body;

    if (!doctorId || !date || !time) {
        throw new ApiError(400, "doctorId, date, and time are required.");
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new ApiError(404, "Doctor not found.");
    }

    const conflict = await Appointment.findOne({
        doctorId,
        date,
        time,
        status: { $ne: "cancelled" },
    });

    if (conflict) {
        throw new ApiError(409, "Slot already booked.");
    }

    const appointment = await Appointment.create({
        doctorId,
        userId: req.user._id,
        date,
        time,
        reason: reason || "",
    });

    res.status(201).json(
        new ApiResponse(201, "Appointment booked successfully.", appointment)
    );
});

// PATIENT
const getMyAppointments = asyncHandler(async (req, res) => {
    console.log("REQ USER:", req.user._id);

    const appointments = await Appointment.find({
        userId: req.user._id,
    })
        .populate({
            path: "doctorId",
            populate: { path: "user", select: "fullName email" },
        })
        .sort({ createdAt: -1 });

    console.log("APPOINTMENTS:", appointments.length);

    res.status(200).json(
        new ApiResponse(200, "Appointments fetched successfully.", appointments)
    );
});

// DOCTOR
const getDoctorAppointments = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findOne({ user: req.user._id });

    if (!doctor) {
        throw new ApiError(404, "Doctor profile not found.");
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
        .populate("userId", "fullName email")
        .sort({ date: 1, time: 1 });

    res.status(200).json(
        new ApiResponse(200, "Appointments fetched successfully.", appointments)
    );
});

// UPDATE STATUS
const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { action } = req.body;

    if (!["accept", "cancel"].includes(action)) {
        throw new ApiError(400, "Invalid action.");
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
        throw new ApiError(404, "Appointment not found.");
    }

    const doctor = await Doctor.findOne({ user: req.user._id });

    if (!doctor || !appointment.doctorId.equals(doctor._id)) {
        throw new ApiError(403, "Not authorized.");
    }

    if (action === "accept") appointment.status = "accepted";
    if (action === "cancel") appointment.status = "cancelled";

    await appointment.save();

    res.status(200).json(
        new ApiResponse(200, "Updated successfully.", appointment)
    );
});

export {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
};
