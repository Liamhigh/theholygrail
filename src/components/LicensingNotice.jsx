import React from "react";

export default function LicensingNotice({ onAcknowledge }) {
  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2 style={{ marginBottom: "15px" }}>Institution / Company Licensing</h2>

      <p style={{ lineHeight: "1.6" }}>
        Verum Omnis is free for private citizens in every country.
      </p>

      <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
        As an <strong>institution or company</strong>, you are using the 
        professional edition of the forensic engine.  
        <br /><br />
        A licensing fee applies after the trial period.  
        This includes:
      </p>

      <ul style={{ marginTop: "10px", marginLeft: "20px" }}>
        <li>Full forensic engine access</li>
        <li>Legal AI modules</li>
        <li>Document, image, audio and video verification</li>
        <li>Institution compliance & audit features</li>
      </ul>

      <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
        Continuing means you accept the trial terms and the licensing fee 
        that will be communicated to your organisation.
      </p>

      <button
        onClick={onAcknowledge}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          width: "100%",
          borderRadius: "6px",
          fontWeight: "bold"
        }}
      >
        Continue
      </button>
    </div>
  );
}
