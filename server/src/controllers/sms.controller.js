import client from "../utils/tiwilioClient.js";

export const sendSMS = async (req, res) => {
    const { to, message } = req.body;

    try {
        const sms = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to, // recipient number with country code
        });

        res.status(200).json({
            message: "SMS sent successfully",
            sid: sms.sid,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to send SMS",
            error: err.message,
        });
    }
};
