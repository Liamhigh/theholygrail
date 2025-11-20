import React from "react";
import { buildNarrative, buildPDF } from "../modules/caseMerger";
import { saveToVault } from "../storage/localVault";

export default function GenerateReportButton({ merged }) {
  const handlePDF = async () => {
    const narrative = buildNarrative(merged);
    const pdfBlob = await buildPDF(narrative);

    const arrayBuffer = await pdfBlob.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    const ok = await saveToVault(
      `Verum_Report_${Date.now()}.pdf`,
      base64,
      "report"
    );

    alert(ok ? "PDF saved to Reports folder." : "Cannot save PDF.");
  };

  return (
    <button
      onClick={handlePDF}
      style={{
        padding: "12px 20px",
        width: "100%",
        background: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "6px",
        marginTop: "20px",
        fontWeight: "bold"
      }}
    >
      Generate Full Narrative PDF
    </button>
  );
}
