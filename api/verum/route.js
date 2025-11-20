import OpenAI from "openai";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid JSON: Expected structured forensic summary." }),
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: body
    });

    const output = response.output_text || "No output returned.";

    return new Response(JSON.stringify({ result: output }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Server error",
        message: err.message
      }),
      { status: 500 }
    );
  }
}
