import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    if (!input || input.trim().length < 20) {
      return res.status(400).json({ error: "Input too short" });
    }

    // 🔒 Limit document size (VERY important for stability)
    const MAX_LENGTH = 4000;
    const trimmedInput =
      input.length > MAX_LENGTH
        ? input.substring(0, MAX_LENGTH)
        : input;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // More stable than 2.5 for this use case
    });

    const prompt = `
You are a strict JSON generator.

Analyze this legal document and identify key user risks.
Classify each risk as "high", "medium", or "low".

Rules:
- Limit to maximum 8 risks.
- Be concise.
- No markdown.
- No extra text.
- Return ONLY valid JSON.

Format:
{
  "trustScore": number (0-100),
  "risks": ["risk 1", "risk 2"],
  "severity": ["high", "medium"]
}

Document:
${trimmedInput}
`;

    // 🔥 Force Gemini to return JSON only
    const result = await Promise.race([
      model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("AI timeout")), 9000)
      ),
    ]);

    const rawText = result.response.text();

    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch {
      throw new Error("Invalid JSON from AI");
    }

    // 🛡 Structure validation
    if (
      typeof parsed.trustScore !== "number" ||
      !Array.isArray(parsed.risks) ||
      !Array.isArray(parsed.severity)
    ) {
      throw new Error("Invalid response structure");
    }

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("Gemini Error:", error.message);

    // Never crash frontend
    return res.status(200).json({
      trustScore: 0,
      risks: [
        "Analysis service temporarily unavailable. Please try again."
      ],
      severity: ["high"],
    });
  }
}
