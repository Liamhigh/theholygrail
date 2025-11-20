import OpenAI from "openai";

export async function POST(req) {
  const { summary } = await req.json();

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await client.responses.create({
    model: process.env.OPENAI_AGENT_ID,
    input: summary
  });

  return new Response(JSON.stringify({ output: response.output_text }), { 
    headers: { "Content-Type": "application/json" }
  });
}
