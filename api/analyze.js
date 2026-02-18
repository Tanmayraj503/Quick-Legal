export default async function handler(req, res) {
    console.log("API route hit 🔥");
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { input } = req.body;

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Analyze this Terms of Service or legal document and identify the key risks for users. For each risk, classify it as 'high', 'medium', or 'low' severity.

Document:
${input}

Respond only with a JSON object in this exact format (no other text):
{
"trustScore": <number between 0-100>,
"risks": ["risk description 1", "risk description 2", ...],
"severity": ["high", "medium", ...]
}
Include 3-7 most important risks. Be concise and specific.`
                        }]
                    }]
                })
            }
        );

        const data = await geminiResponse.json();

        // 🔥 IMPORTANT: Send Gemini response exactly as-is
        return res.status(200).json(data);

    } catch (error) {
        console.error("Backend error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
