import dotenv from "dotenv";
import DBConnect from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./env" });

DBConnect()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server started on PORT ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Cannot connect to server\n${err}`);
    });
