import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Patient } from "../models/patient.model.js";
import { User } from "../models/user.model.js";
import { FollowUp } from "../models/followUp.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
        !notes
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

const fetchPatients = asyncHandler(async (req, res) => {
    // populate() will replace patients ObjectId with actual patient data, as i am only saving ref(_id) of patient in followUp model
    const followUpData = await FollowUp.find({ doctor: req.user._id }).populate(
        { path: "patient" }
    );

    if (!followUpData) {
        throw new ApiError(401, "No data found!");
    }
    // FollowUp data contains each followup till date with ref to patient and it returns each followup so in folloup we have field called patient which has ref to Patient model thus we have to loop over each followup to access fields of followup model
    followUpData.forEach((followUp) => {
        const patient = followUp.patient;
        const patientName = patient?.name;
        const diseases = followUp.diseases.join(", ");
        console.log(`${patient?.name} has diseases ${diseases}`);

        // diseases.map((disease) => console.log(`${disease}`));
    });

    res.json(
        new ApiResponse(200, "Data fetched successfully", {
            followUpData,
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
const deletePatient = asyncHandler(async (req, res) => {
    const { id } = req.params; //id here is same defined in route after /
    await Patient.findByIdAndDelete({ _id: id });
    res.json(new ApiResponse(200, "Successfully deleted patient"));
});
export { addPatient, fetchPatients, updatePatientDetails, deletePatient };
