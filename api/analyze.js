import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "No input provided" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Analyze this legal document and identify key risks.

Respond ONLY in valid JSON:

{
  "trustScore": number (0-100),
  "risks": ["risk 1", "risk 2", "risk 3"],
  "severity": ["high", "medium", "low"]
}

Document:
${input}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanedText);

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      trustScore: 0,
      risks: ["Internal server error. Please try again."],
      severity: ["high"],
    });
  }
}
