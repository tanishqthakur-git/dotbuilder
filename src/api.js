import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { language, sourceCode, stdin = "" } = req.body;

  try {
    const pistonResponse = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          name: "main",
          content: sourceCode,
        },
      ],
      stdin,
    });

    res.status(200).json(pistonResponse.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to execute code", details: err.message });
  }
}
