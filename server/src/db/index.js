import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const DBConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );
        // if possible give mongoose.connect(
        //     `${process.env.MONGODB_URL}/${DB_NAME}`
        console.log(`Connection details ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED: ", error);
    }
};

export default DBConnect;
