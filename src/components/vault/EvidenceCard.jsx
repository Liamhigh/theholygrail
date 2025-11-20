import React from "react";

export default function EvidenceCard({ item, onDelete }) {
  return (
    <div style={{
      background: "#0f172a",
      padding: 15,
      marginBottom: 15,
      border: "1px solid #334155",
      borderRadius: 8
    }}>
      <h3 style={{ color: "white" }}>{item.name}</h3>
      <p style={{ color: "#64748b" }}>Type: {item.type}</p>
      <p style={{ color: "#64748b" }}>Hash: {item.hash.slice(0, 20)}...</p>
      <p style={{ color: "#64748b" }}>Added: {new Date(item.addedAt).toLocaleString()}</p>

      <button
        onClick={() => onDelete(item.id)}
        style={{
          background: "#dc2626",
          border: "none",
          color: "white",
          padding: "8px 12px",
          borderRadius: 6,
          marginTop: 10
        }}
      >
        Delete
      </button>
    </div>
  );
}
