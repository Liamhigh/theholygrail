import React from "react";

export default function CaseFile() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "white" }}>Your Case File</h2>
      <p style={{ marginTop: "10px", color: "white", lineHeight: "1.5" }}>
        All reports and evidence are saved locally on your device.
        <br /><br />
        • Evidence → /Documents/Evidence<br />
        • Reports → /Documents/Reports
        <br /><br />
        This data never leaves your phone. Nothing is uploaded.
      </p>
      <p style={{ marginTop: "20px", color: "#93c5fd" }}>
        (APK version supports full offline storage)
      </p>
    </div>
  );
}
