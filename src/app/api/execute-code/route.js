import axios from "axios";

// Judge0 API route handler for POST requests
export async function POST(request) {
  try {
    const body = await request.json();
    const { language_id, sourceCode, stdin = "" } = body;

    const submissionRes = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        language_id,
        source_code: sourceCode,
        stdin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // Make sure it's set in .env.local
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    return new Response(JSON.stringify(submissionRes.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Judge0 API error:", err.response?.data || err.message);
    return new Response(
      JSON.stringify({
        error: "Code execution failed",
        details: err.response?.data || err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
