import { GoogleGenerativeAI } from "@google/generative-ai";

const CHUNK_SIZE = 3000; // safe size

function splitIntoChunks(text) {
  const chunks = [];
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    chunks.push(text.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
}

function calculateTrustScore(severities) {
  const weights = { low: 10, medium: 20, high: 35 };
  let totalRisk = 0;

  severities.forEach((s) => {
    totalRisk += weights[s] || 0;
  });

  return Math.max(0, 100 - totalRisk);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    if (!input || input.trim().length < 20) {
      return res.status(400).json({ error: "Input too short" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const chunks = splitIntoChunks(input);

    let allRisks = [];
    let allSeverities = [];

    for (const chunk of chunks) {
      const prompt = `
Analyze this legal document section.
Identify key user risks.
Classify each as "high", "medium", or "low".
Return ONLY valid JSON:

Format:
{
 "trustScore": number (0-100),
  "risks": ["risk 1", "risk 2"],
  "severity": ["high", "medium"]
}

Document Section:
${chunk}
`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const parsed = JSON.parse(result.response.text());

      if (Array.isArray(parsed.risks)) {
        allRisks.push(...parsed.risks);
      }

      if (Array.isArray(parsed.severity)) {
        allSeverities.push(...parsed.severity);
      }
    }

    // Remove duplicates
    const uniqueRisks = [...new Set(allRisks)];

    const trustScore = calculateTrustScore(allSeverities);

    return res.status(200).json({
      trustScore,
      risks: uniqueRisks.slice(0, 10),
      severity: allSeverities.slice(0, 10),
    });

  } catch (error) {
    console.error("Gemini Error:", error.message);

    return res.status(200).json({
      trustScore: 0,
      risks: ["Analysis service temporarily unavailable. Please try again."],
      severity: ["high"],
    });
  }
}
