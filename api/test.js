import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("Loaded key:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const run = async () => {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Say hello",
    });

    console.log(res.text);
  } catch (err) {
    console.error("Test error:", err);
  }
};

run();
