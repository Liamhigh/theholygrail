import React, { useState } from "react";
import { generateSafeDisclosure } from "../modules/safeDisclosure";
import download from "downloadjs";

export default function SafeDisclosure({ bundlePDF, summaryJSON }) {
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const out = await generateSafeDisclosure({ bundlePDF, summaryJSON });

      download(out.policePDF, "Verum_Omnis_Police_Disclosure.pdf", "application/pdf");
      download(out.bankPDF, "Verum_Omnis_Bank_Disclosure.pdf", "application/pdf");
    } catch (e) {
      console.log("Disclosure error:", e);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={run}
      disabled={loading}
      style={{
        background: "#ef4444",
        color: "white",
        padding: "14px 16px",
        marginTop: 20,
        borderRadius: 8
      }}
    >
      {loading ? "Preparing Disclosure..." : "Generate Disclosure Packs"}
    </button>
  );
}
