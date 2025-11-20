import React, { useState } from "react";
import { callVerumAgent } from "../utils/callVerumAgent";

export default function LegalAdvice() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const result = await callVerumAgent(input);
    setOutput(result);
    setLoading(false);
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Legal Advice (AI-Generated)</h2>

      <textarea
        style={{ width: "100%", minHeight: "100px", marginTop: "10px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your situation or question..."
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          width: "100%"
        }}
      >
        {loading ? "Thinking..." : "Get Legal Advice"}
      </button>

      {output && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#111",
            borderRadius: "5px",
          }}
        >
          <h3>AI Response:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}
