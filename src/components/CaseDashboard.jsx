import React, { useEffect, useState } from "react";
import { listCases, evaluateEscalation } from "../modules/caseArchive";

export default function CaseDashboard({ onSelectCase }) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    evaluateEscalation();
    setCases(listCases());
  }, []);

  return (
    <div style={{ color: "#fff", padding: 20 }}>
      <h2>Your Cases</h2>

      {cases.length === 0 && <div>No cases yet.</div>}

      {cases.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelectCase(c.id)}
          style={{
            marginTop: 15,
            padding: 15,
            borderRadius: 10,
            background: "#1f2937",
            cursor: "pointer"
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 5 }}>{c.title}</div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>
            {c.lifecycle}
          </div>
        </div>
      ))}
    </div>
  );
}
