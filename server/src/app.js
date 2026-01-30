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
app.use("/api/v1/users", userRouter);
export { app };
