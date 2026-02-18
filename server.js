import http from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === "POST" && req.url === "/api/analyze") {
        let body = "";

        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            try {
                const { input } = JSON.parse(body);

                if (!input) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "No input provided" }));
                    return;
                }

                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

                const prompt = `
Analyze this Terms of Service or legal document and identify the key risks for users.

Respond ONLY with valid JSON:
{
  "trustScore": <number between 0-100>,
  "risks": ["risk 1", "risk 2"],
  "severity": ["high", "medium"]
}

Document:
${input}
`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                const cleanedText = text.replace(/```json|```/g, "").trim();
                const parsed = JSON.parse(cleanedText);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(parsed));

            } catch (error) {
                console.error("Error:", error);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Internal Server Error" }));
            }
        });

    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found" }));
    }
});

server.listen(5000, () => console.log("Server running on http://localhost:5000"));