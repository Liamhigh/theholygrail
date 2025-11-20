import React, { useState, useEffect } from "react";
import {
  getCase,
  addEvidence,
  addReport,
  logDisclosure
} from "../modules/caseArchive";

export default function CaseView({ caseId }) {
  const [c, setC] = useState(null);

  useEffect(() => {
    setC(getCase(caseId));
  }, [caseId]);

  if (!c) return <div>Loading...</div>;

  return (
    <div style={{ color: "#fff", padding: 20 }}>
      <h2>{c.title}</h2>

      <div style={{ marginTop: 10 }}>
        <b>Lifecycle:</b> {c.lifecycle}
      </div>

      <h3 style={{ marginTop: 20 }}>Evidence</h3>
      {c.evidence.map((e, i) =>
        <div key={i} style={{ opacity: 0.8 }}>
          {e.filename} — {e.hash.substring(0, 12)}…
        </div>
      )}

      <h3 style={{ marginTop: 20 }}>Reports</h3>
      {c.reports.map((r, i) =>
        <div key={i} style={{ opacity: 0.8, marginBottom: 10 }}>
          {r.text.substring(0, 80)}...
        </div>
      )}

      <h3 style={{ marginTop: 20 }}>Disclosure</h3>
      {c.disclosure.map((d, i) =>
        <div key={i}>
          Sent to {d.target} — {new Date(d.time).toLocaleString()}
        </div>
      )}
    </div>
  );
}
