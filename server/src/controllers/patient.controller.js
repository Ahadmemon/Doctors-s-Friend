import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Patient } from "../models/patient.model.js";
import { User } from "../models/user.model.js";
import { FollowUp } from "../models/followUp.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PatientProfile } from "../models/patients.model.js";

const addPatient = asyncHandler(async (req, res) => {
    const {
        name,
        address,
        gender,
        age,
        contactNumber,
        weight,
        diseases,
        treatments,
        notes,
        status,
    } = req.body;
    // const verifiedUser = await User.findById(req.user._id);
    // if (!verifiedUser) {
    //     throw new ApiError(401, "Wrong person");
    // }
    if (
        !name ||
        !address ||
        !gender ||
        !age ||
        !contactNumber ||
        !weight ||
        !diseases ||
        !treatments ||
        !notes ||
        !status
    ) {
        throw new ApiError(400, "All fields required");
    }
    const patient = await Patient.create({
        doctor: req.user._id,
        name,
        address,
        gender,
        age,
        contactNumber,
        weight,
        status,
    });
    if (!patient) {
        throw new ApiError(401, "No Patient added");
    }
    const patientFollowUp = await FollowUp.create({
        patient: patient._id,
        doctor: req.user._id,
        diseases,
        treatments,
        notes,
    });
    return res.json(
        new ApiResponse(200, "Successfully added patient", {
            patient,
            patientFollowUp,
        })
    );
});
const createPatientProfile = asyncHandler(async (req, res) => {
    const { fullName, address, gender, age, mobile } = req.body;

    if (!fullName || !address || !gender || !age || !mobile) {
        throw new ApiError(400, "All fields required");
    }
    const patient = await PatientProfile.create({
        user: req.user._id,
        fullName,
        address,
        gender,
        age,
        mobile,
    });
    if (!patient) {
        throw new ApiError(401, "No Patient added");
    }

    return res.json(
        new ApiResponse(200, "Successfully added patient", {
            patient,
        })
    );
});
const updatePatientProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    // ✅ was !updatedData which is always false (object is always truthy)
    if (!updatedData || Object.keys(updatedData).length === 0) {
        throw new ApiError(400, "No data found to update");
    }

    const updatedPatientData = await PatientProfile.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
    );

    if (!updatedPatientData) {
        throw new ApiError(404, "Patient profile not found");
    }

    res.json(
        new ApiResponse(
            200,
            "Successfully updated patient data",
            updatedPatientData
        )
    );
});
const getPatientData = asyncHandler(async (req, res) => {
    // populate() will replace patients ObjectId with actual patient data, as i am only saving ref(_id) of patient in followUp model
    const { id } = req.params;
    const patientData = await PatientProfile.find({ user: id });
    // console.log(followUpData);

    if (!patientData) {
        throw new ApiError(401, "No data found!");
    }

    res.json(
        new ApiResponse(200, "Data fetched successfully", {
            patientData,
        })
    );
});

const updatePatientDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    if (!updatedData) {
        throw new ApiError(401, "No data found to update");
    }
    const updatedPatientData = await Patient.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
    );
    res.json(
        new ApiResponse(
            200,
            "Successfully updated patients data",
            updatedPatientData
        )
    );
});
const fetchPatients = asyncHandler(async (req, res) => {
    // populate() will replace patients ObjectId with actual patient data, as i am only saving ref(_id) of patient in followUp model
    const followUpData = await FollowUp.find({ doctor: req.user._id }).populate(
        { path: "patient" }
    );
    // console.log(followUpData);

    if (!followUpData) {
        throw new ApiError(401, "No data found!");
    }

    res.json(
        new ApiResponse(200, "Data fetched successfully", {
            followUpData,
        })
    );
});
const deletePatient = asyncHandler(async (req, res) => {
    const { id } = req.params; //id here is same defined in route after /
    await Patient.findByIdAndDelete({ _id: id });
    res.json(new ApiResponse(200, "Successfully deleted patient"));
});
export {
    addPatient,
    fetchPatients,
    updatePatientDetails,
    deletePatient,
    createPatientProfile,
    updatePatientProfile,
    getPatientData,
};
