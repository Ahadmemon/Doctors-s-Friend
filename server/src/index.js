import dotenv from "dotenv";
import { app } from "./app.js";
import DBConnect from "./db/index.js";

dotenv.config({ path: "./env" });

DBConnect()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(
                `✅ Server running on PORT ${process.env.PORT || 5000}`
            );
        });
    })
    .catch((err) => {
        console.log(`❌ Cannot connect to server\n${err}`);
    });
