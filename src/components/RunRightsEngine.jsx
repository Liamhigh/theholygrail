import React, { useState } from "react";
import RightsEngineResult from "./RightsEngineResult";
import { rightsEngine } from "../modules/rightsEngine";

export default function RunRightsEngine({ summaryJSON }) {
  const [jurisdiction, setJurisdiction] = useState("SA");
  const [result, setResult] = useState(null);

  const run = () => {
    const r = rightsEngine(summaryJSON, jurisdiction);
    setResult(r);
  };

  return (
    <div>
      <select
        onChange={e => setJurisdiction(e.target.value)}
        style={{ padding: 12, marginTop: 20 }}
      >
        <option value="SA">South Africa</option>
        <option value="UAE">UAE</option>
        <option value="EU">EU</option>
      </select>

      <button
        onClick={run}
        style={{
          background: "#2563eb",
          color: "white",
          padding: "12px 16px",
          borderRadius: 8,
          marginLeft: 10
        }}
      >
        Show Rights
      </button>

      <RightsEngineResult result={result} />
    </div>
  );
}
