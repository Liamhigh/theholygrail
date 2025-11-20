import React, { useState } from "react";
import { generateMasterReport } from "../modules/masterReport";
import download from "downloadjs";

export default function GenerateFinalReport({ inputs }) {
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const pdfBytes = await generateMasterReport(inputs);
      download(pdfBytes, "Verum_Omnis_Final_Report.pdf", "application/pdf");
    } catch (e) {
      console.log("Error generating report:", e);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={run}
      disabled={loading}
      style={{
        background: "#0ea5e9",
        color: "white",
        padding: "14px 16px",
        marginTop: 20,
        borderRadius: 8
      }}
    >
      {loading ? "Building Report..." : "Generate Final Sealed Report"}
    </button>
  );
}
