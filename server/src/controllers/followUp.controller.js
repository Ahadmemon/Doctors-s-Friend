import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { FollowUp } from "../models/followUp.model.js";
const addFollowUp = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { diseases, treatments, notes } = req.body;
    const patientFollowUp = await FollowUp.create({
        patient: id,
        doctor: req.user._id,
        diseases,
        treatments,
        notes,
    });
    if (!patientFollowUp) {
        throw new ApiError(500, "Something went wrong!");
    }
    return res.json(
        new ApiResponse(
            200,
            "Successfully added followUp data",
            patientFollowUp
        )
    );
});
const fetchFollowUps = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const patientFollowUps = await FollowUp.find({
        patient: id,
        doctor: req.user._id,
    }).select("-patient -doctor");
    console.log(
        patientFollowUps.map((f) => f.createdAt.toLocaleDateString("en-GB"))
    );
    console.log(
        patientFollowUps.map((f) => f.createdAt.toISOString().split("T")[0])
    );

    // .populate({
    //     path: "patient",
    // });
    res.json(
        new ApiResponse(
            200,
            "Successfully fetched patient followUps data",
            patientFollowUps
        )
    );
});
const updateFollowUpData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const patientsUpdatedFollowUpData = await FollowUp.findByIdAndUpdate(
        {
            _id: id,
        },
        {
            $set: dataToUpdate,
        },
        { new: true }
    ).select("-patient -doctor");

    // .populate({
    //     path: "patient",
    // });
    res.json(
        new ApiResponse(
            200,
            "Successfully updated patient's followUp data",
            patientsUpdatedFollowUpData
        )
    );
});
const deleteFollowUp = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await FollowUp.findByIdAndDelete(id);

    res.json(new ApiResponse(200, "Successfully deleted patient's followUp"));
});
export { addFollowUp, fetchFollowUps, updateFollowUpData, deleteFollowUp };
