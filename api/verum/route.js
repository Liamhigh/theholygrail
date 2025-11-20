import OpenAI from "openai";

export async function POST(req) {
  const body = await req.json();

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await client.responses.create({
    model: "gpt-4.1", 
    input: body
  });

  return new Response(
    JSON.stringify({ output: response.output_text }), 
    { headers: { "Content-Type": "application/json" }}
  );
}
