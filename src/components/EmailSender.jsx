import React, { useState } from "react";
import { buildEmail, generateMailtoLink, saveReminder } from "../modules/emailEngine";

export default function EmailSender({ summaryJSON, policePDF, bankPDF, hash }) {
  const [inst, setInst] = useState("Police");

  function prepare() {
    const emailBody = buildEmail({
      institution: inst,
      summary: summaryJSON,
      policePDF,
      bankPDF,
      hash
    });

    // Add follow-up reminder automatically:
    if (inst === "Police") saveReminder("Police Follow-Up", 2);
    if (inst === "Bank") saveReminder("Bank Follow-Up", 3);

    const link = generateMailtoLink(inst, emailBody);
    window.location.href = link;
  }

  return (
    <div style={{ marginTop: 25 }}>
      <label style={{ color: "#fff" }}>Choose recipient:</label>
      <select
        value={inst}
        onChange={(e) => setInst(e.target.value)}
        style={{
          padding: 10,
          borderRadius: 8,
          marginLeft: 10
        }}
      >
        <option>Police</option>
        <option>Bank</option>
        <option>Lawyer</option>
        <option>Embassy</option>
        <option>Insurer</option>
      </select>

      <button
        onClick={prepare}
        style={{
          marginTop: 20,
          background: "#3b82f6",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: 8
        }}
      >
        Generate Email & Attach Disclosure
      </button>
    </div>
  );
}
