import React from "react";

export default function ThreatReport({ data }) {
  if (!data) return null;

  return (
    <div style={{ padding: 20, background: "#1e293b", borderRadius: 8 }}>
      <h2 style={{ color: "white" }}>Threat & Retaliation Firewall</h2>

      <p style={{ color: "white" }}>
        <b>Severity:</b> {data.severity}
      </p>
      <p style={{ color: "white" }}>
        <b>Score:</b> {data.score}/100
      </p>

      <div>
        <h3 style={{ color: "white" }}>Indicators:</h3>
        {data.indicators.map((i, index) => (
          <p key={index} style={{ color: "#94a3b8" }}>• {i}</p>
        ))}
      </div>

      <p style={{ color: "#64748b", marginTop: 10 }}>
        This module evaluates threat and retaliation patterns.  
        No evidence leaves the device.
      </p>
    </div>
  );
}
