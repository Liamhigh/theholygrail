import React from "react";
import { buildDisclosurePack } from "../modules/disclosurePackBuilder";

export default function DisclosurePackButton({ summary, authority }) {

  async function handleGenerate() {
    const zipBlob = await buildDisclosurePack(summary, authority);

    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Verum_Omnis_Disclosure_Pack.zip";
    a.click();
  }

  return (
    <button
      onClick={handleGenerate}
      style={{
        marginTop: 20,
        padding: "10px 20px",
        background: "#059669",
        color: "#fff",
        borderRadius: 8,
        border: "none",
        cursor: "pointer"
      }}
    >
      Generate Disclosure Pack ({authority})
    </button>
  );
}
