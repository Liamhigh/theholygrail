import OpenAI from "openai";
import { PrimeEngine } from "../../src/core/primeEngine.js";

export async function POST(req) {
  try {
    const input = await req.json();

    // 1. Local deterministic forensic reasoning
    const primeResult = PrimeEngine.reason(input);

    // 2. Send PRIME output to the OpenAI Agent for legal interpretation
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.responses.create({
      model: "gpt-4.1",    // or your Agent ID
      input: {
        forensic: primeResult,
        jurisdiction: input.jurisdiction || "Unknown",
        summary: input.summary || "",
      }
    });

    return new Response(
      JSON.stringify({
        forensic: primeResult,
        legal: completion.output_text
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Backend error", details: err.message }),
      { status: 500 }
    );
  }
}
