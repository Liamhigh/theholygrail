import React, { useState } from "react";
import ThreatReport from "../components/threat/ThreatReport";
import { analyseThreat } from "../modules/threatFirewall";

export default function ThreatPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const run = () => {
    const data = analyseThreat(input);
    setResult(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "white" }}>Threat & Retaliation Firewall</h1>

      <textarea
        style={{
          width: "100%",
          height: 120,
          background: "#0f172a",
          color: "white",
          border: "1px solid #334155",
          borderRadius: 6,
          padding: 10
        }}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste the summary or transcript..."
      />

      <button
        onClick={run}
        style={{
          marginTop: 15,
          padding: 10,
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
          width: "100%"
        }}
      >
        Scan for Threats
      </button>

      <div style={{ marginTop: 20 }}>
        <ThreatReport data={result} />
      </div>
    </div>
  );
}
