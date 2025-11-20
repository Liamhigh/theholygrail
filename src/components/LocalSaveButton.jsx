import React from "react";
import { saveToVault } from "../storage/localVault";

export default function LocalSaveButton({ summary }) {
  const handleSave = async () => {
    const ok = await saveToVault(
      `Report_${Date.now()}.txt`,
      JSON.stringify(summary, null, 2),
      "report"
    );

    if (ok) alert("Saved to local Reports folder.");
    else alert("Could not save file. Check permissions.");
  };

  return (
    <button
      onClick={handleSave}
      style={{
        marginTop: "10px",
        padding: "12px 20px",
        background: "#22c55e",
        border: "none",
        width: "100%",
        borderRadius: "6px",
        color: "white",
        fontWeight: "bold"
      }}
    >
      Save Forensic Report
    </button>
  );
}
