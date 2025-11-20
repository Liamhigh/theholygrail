import React, { useState } from "react";
import { generateCaseBundle } from "../modules/caseBundle";
import download from "downloadjs";

export default function GenerateCaseBundle({ finalReportPDF, summaryJSON }) {
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const bundleBytes = await generateCaseBundle({
        finalReportPDF,
        summaryJSON
      });
      download(bundleBytes, "Verum_Omnis_Case_Bundle.pdf", "application/pdf");
    } catch (e) {
      console.log("Bundle error:", e);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={run}
      disabled={loading}
      style={{
        background: "#8b5cf6",
        color: "white",
        padding: "14px 16px",
        marginTop: 20,
        borderRadius: 8
      }}
    >
      {loading ? "Building Case Bundle..." : "Generate Case Bundle"}
    </button>
  );
}
