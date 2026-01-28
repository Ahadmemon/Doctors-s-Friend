import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//we first upload file to our localServer and then upload to cloudinary service thus we require localFilePath
const cloudinaryUploadHelper = async (localFilePath) => {
    try {
        if (!localFilePath)
            return console.log(`${localFilePath} path not available`);
        // upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log(`File uploaded succesfully:\ns${response}`); //this is whole response object you can extract whatever required from this object
        return response;
    } catch (error) {
        fs.unlink(localFilePath);
        return console.log(error);
    }
};
export { cloudinaryUploadHelper };
