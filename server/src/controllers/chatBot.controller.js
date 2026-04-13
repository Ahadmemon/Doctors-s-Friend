import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getMedicalAnswer = asyncHandler(async (req, res) => {
    const { question } = req.body;

    if (!question) {
        throw new ApiError(400, "Question is required");
    }

    try {
        // 1. Get the model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: {
                role: "system",
                parts: [
                    {
                        text: `You are a medical assistant. Only provide accurate medical information. 
                    If asked non-medical questions, politely say you only answer medical questions. 
                    Always advise consulting a doctor if unsure.
                    
                    STRICT LANGUAGE RULE:
                    1. If the user asks in English, you must answer in English.
                    2. If the user asks in Hinglish (Roman Hindi/Urdu), you must answer in Hinglish.
                    Example: If user says 'Mujhe fever hai', respond in Hinglish like 'Aapko paracetamol leni chahiye aur rest karna chahiye...'`,
                    },
                ],
            }, // Fixed: Properly closed the systemInstruction object
        });

        const generationConfig = {
            temperature: 0.2, // Low temperature for higher accuracy
            maxOutputTokens: 500,
        };

        // 2. Generate content
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: question }] }],
            generationConfig,
        });

        const response = await result.response;
        const text = response.text();

        // 3. Check if the response was blocked or empty
        if (!text) {
            throw new ApiError(
                500,
                "The AI could not generate a response for this query."
            );
        }

        return res.status(200).json(
            new ApiResponse(200, "Answer fetched successfully", {
                answer: text,
            })
        );
    } catch (err) {
        console.error("Gemini API Error:", err);

        // Handle specific safety blockings or API errors
        if (err.message?.includes("SAFETY")) {
            throw new ApiError(
                400,
                "The request was flagged by safety filters. Please rephrase."
            );
        }

        throw new ApiError(
            500,
            err.message || "Failed to get answer from Gemini"
        );
    }
});

export { getMedicalAnswer };
