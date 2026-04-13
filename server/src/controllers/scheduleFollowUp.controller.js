// controllers/scheduleFollowUp.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ScheduleFollowUp } from "../models/scheduleFollowUp.model.js";
import { Patient } from "../models/patient.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/doctor.model.js";
import client from "../utils/tiwilioClient.js";

// Doctor schedules follow-up for existing patient
const scheduleFollowUp = asyncHandler(async (req, res) => {
    const { patientId, date, time, reason } = req.body;
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!patientId || !date || !time) {
        throw new ApiError(400, "patientId, date, and time are required");
    }

    const patient = await Patient.findById(patientId);
    if (!patient) throw new ApiError(404, "Patient not found");

    // Create follow-up first
    const followUp = await ScheduleFollowUp.create({
        patient: patientId,
        doctor: req.user._id,
        date,
        time,
        reason: reason || "",
    });

    // Send SMS if contact number exists
    if (patient.contactNumber) {
        const phone = patient.contactNumber.startsWith("+")
            ? patient.contactNumber
            : `+91${patient.contactNumber}`;

        const messageBody = `Hello ${patient.name}, your next follow-up is scheduled on ${date} at ${time}. Reason: ${reason || "General check-up"}. Doctor: ${req.user.fullName} Clinic Address: ${doctor?.address || "N/A"}`;

        try {
            await client.messages.create({
                body: messageBody,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone,
            });
        } catch (err) {
            console.error("Failed to send SMS:", err.message);
            // We don't throw here, follow-up is already created
        }
    }

    res.status(201).json(
        new ApiResponse(
            201,
            "Follow-up scheduled successfully" +
                (patient.contactNumber ? " & SMS sent" : ""),
            followUp
        )
    );
});

// Get follow-ups for a doctor
const getDoctorFollowUps = asyncHandler(async (req, res) => {
    const followUps = await ScheduleFollowUp.find({ doctor: req.user._id })
        .populate("patient", "fullName email contactNumber")
        .sort({ date: 1, time: 1 });

    res.status(200).json(
        new ApiResponse(200, "Doctor follow-ups fetched", followUps)
    );
});

// Get follow-ups for a patient
const getPatientFollowUps = asyncHandler(async (req, res) => {
    const followUps = await ScheduleFollowUp.find({ patient: req.user._id })
        .populate("doctor", "fullName email")
        .sort({ date: 1, time: 1 });

    res.status(200).json(
        new ApiResponse(200, "Patient follow-ups fetched", followUps)
    );
});

export { scheduleFollowUp, getDoctorFollowUps, getPatientFollowUps };
