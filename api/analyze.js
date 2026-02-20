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

    // 🔒 Limit input length (VERY IMPORTANT)
    const MAX_LENGTH = 6000;
    const trimmedInput =
      input.length > MAX_LENGTH
        ? input.substring(0, MAX_LENGTH)
        : input;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // 🔥 More stable & faster
    });

    const prompt = `
You are a strict JSON generator.

Analyze this Terms of Service or legal document and identify the key risks for users.
For each risk, classify it as "high", "medium", or "low".

IMPORTANT:
- Be concise.
- Limit to top 8 most significant risks.
- Respond ONLY with valid JSON.
- No markdown.
- No backticks.

Format:
{
  "trustScore": number,
  "risks": ["risk description"],
  "severity": ["high" | "medium" | "low"]
}

Document:
${trimmedInput}
`;

    // ⏳ Add timeout protection (prevents Vercel crash)
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("AI timeout")), 9000)
      ),
    ]);

    const text = result.response.text();

    // 🔧 Safe JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // 🛡 Validate structure
    if (
      typeof parsed.trustScore !== "number" ||
      !Array.isArray(parsed.risks) ||
      !Array.isArray(parsed.severity)
    ) {
      throw new Error("Invalid JSON structure");
    }

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("Gemini Error:", error.message);

    return res.status(200).json({
      trustScore: 0,
      risks: ["Analysis service temporarily unavailable. Please try again."],
      severity: ["high"],
    });
  }
}
