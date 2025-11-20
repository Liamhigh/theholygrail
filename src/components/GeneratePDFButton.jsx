import React from "react";
import { buildNarrative } from "../modules/narrativeBuilder";
import { generateVerumPDF } from "../modules/pdfGenerator";

export default function GeneratePDFButton({ summary }) {
  async function handleGenerate() {
    const narrative = buildNarrative(summary);
    const pdfBlob = await generateVerumPDF(narrative);

    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Verum_Omnis_Forensic_Report.pdf";
    a.click();
  }

  return (
    <button
      onClick={handleGenerate}
      style={{
        marginTop: 20,
        padding: "10px 20px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: 8,
        border: "none",
        cursor: "pointer"
      }}
    >
      Generate Official PDF
    </button>
  );
}
