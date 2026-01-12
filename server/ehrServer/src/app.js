// require("dotenv").config({ path: "./env" });
import express from "express";
// import dotenv from "dotenv";
import DBConnect from "./db/index.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded());
// app.use(express.static());
// app.use(cookieParser());
// dotenv.config({ path: "./env" });
DBConnect();
app.get("/user", (req, res) => {
    res.send("Hello this is from user");
});
app.on("error", (err) => {
    console.log(err);
    throw err;
});
app.listen(port, () => console.log("Server started at port ", port));
