import { Router } from "express";
import {
    addPatient,
    fetchPatients,
    updatePatientDetails,
  
    deletePatient,
    createPatientProfile,
    updatePatientProfile,
    getPatientData,
} from "../controllers/patient.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { scheduleFollowUp } from "../controllers/scheduleFollowUp.controller.js";

const router = Router();

router.post(
    "/createPatientProfile",
    verifyJWT,
    upload.single("photo"),
    createPatientProfile
);
router.patch(
    "/updatePatientProfile/:id",
    verifyJWT,
    upload.single("photo"),
    updatePatientProfile
);
router.get("/getPatientData/:id", verifyJWT, getPatientData); // ✅ fixed syntax bug

router.post("/addPatient", verifyJWT, upload.single("photo"), addPatient);
router.get("/fetchPatients", verifyJWT, fetchPatients);
router.patch("/updatePatient/:id", verifyJWT, updatePatientDetails); // ✅ added verifyJWT
router.delete("/deletePatient/:id", verifyJWT, deletePatient);
router.post("/scheduleFollowUp", verifyJWT, scheduleFollowUp);
export default router;

// import { Router } from "express";
// import {
//     addPatient,
//     fetchPatients,
//     updatePatientDetails,
//     deletePatient,
//     createPatientProfile,
//     updatePatientProfile,
//     getPatientData,
// } from "../controllers/patient.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/multer.middleware.js";

// const router = Router();
// router.post(
//     "/createPatientProfile",
//     verifyJWT,
//     upload.single("photo"),
//     createPatientProfile
// );
// router.patch(
//     "/updatePatientProfile/:id",
//     verifyJWT,
//     upload.single("photo"),
//     updatePatientProfile
// );

// router.post("/addPatient", verifyJWT, upload.single("photo"), addPatient);
// router.get("/fetchPatients", verifyJWT, fetchPatients);
// (upload.single("photo"),
//     router.get("/getPatientData/:id", verifyJWT, getPatientData));
// router.patch("/updatePatient/:id", updatePatientDetails); //use put when updating all fields or say when updating document
// router.delete("/deletePatient/:id", deletePatient);
// export default router;
