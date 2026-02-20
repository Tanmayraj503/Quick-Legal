import { GoogleGenerativeAI } from "@google/generative-ai";

const riskWeights = {
  Low: 10,
  Medium: 20,
  High: 35,
  Critical: 50
};

function calculateTrustScore(risks) {
  let totalRisk = 0;

  risks.forEach(risk => {
    totalRisk += riskWeights[risk.severity] || 0;
  });

  const trustScore = Math.max(0, 100 - totalRisk);
  return trustScore;
}

function safeJsonParse(text) {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (err) {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { text } = req.body;

    if (!text || text.length < 20) {
      return res.status(400).json({ error: "Invalid input text" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a legal risk analysis engine.

Analyze the following legal text thoroughly.

Instructions:
1. Identify ALL possible legal, privacy, financial, cancellation, liability, arbitration, and data-related risks.
2. Be exhaustive.
3. Do NOT summarize.
4. Do NOT give opinions.
5. Return ONLY valid JSON.
6. Format:

{
  "risks": [
    {
      "title": "Short risk title",
      "category": "Privacy | Financial | Legal | Liability | Arbitration | Data | Cancellation | Other",
      "severity": "Low | Medium | High | Critical",
      "explanation": "Clear explanation of the risk."
    }
  ]
}

Legal Text:
${text}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    const parsed = safeJsonParse(rawText);

    if (!parsed || !parsed.risks) {
      return res.status(500).json({
        error: "AI did not return valid structured risk data"
      });
    }

    const trustScore = calculateTrustScore(parsed.risks);

    const categoryBreakdown = {};

    parsed.risks.forEach(risk => {
      if (!categoryBreakdown[risk.category]) {
        categoryBreakdown[risk.category] = 0;
      }
      categoryBreakdown[risk.category]++;
    });

    return res.status(200).json({
      success: true,
      totalRisks: parsed.risks.length,
      trustScore,
      riskBreakdownByCategory: categoryBreakdown,
      risks: parsed.risks
    });

  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
}
