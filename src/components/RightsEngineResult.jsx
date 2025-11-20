import React from "react";

export default function RightsEngineResult({ result }) {
  if (!result) return null;

  return (
    <div style={{ background: "#0f172a", padding: 20, borderRadius: 12, marginTop: 20 }}>
      <h2 style={{ color: "#38bdf8" }}>Jurisdiction Rights Map</h2>
      <pre style={{ color: "white", whiteSpace: "pre-wrap" }}>
{JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}
