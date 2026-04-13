// require("dotenv").config({ path: "./env" });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// app.get("/user", (req, res) => {
//     res.send("Hello this is from user");
// });
// app.on("error", (err) => {
//     console.log(err);
//     throw err;
// });

import userRouter from "./routes/user.routes.js";
import patientRouter from "./routes/patient.routes.js";
import followUpRouter from "./routes/followUp.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import chatRoutes from "./routes/chatBot.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/followUp", followUpRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/chat", chatRoutes);

export { app };
