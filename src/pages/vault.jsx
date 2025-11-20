import React, { useEffect, useState } from "react";
import { saveEvidenceFile, listEvidence, deleteEvidence } from "../modules/evidenceVault";
import EvidenceCard from "../components/vault/EvidenceCard";

export default function VaultPage() {
  const [items, setItems] = useState([]);

  const refresh = async () => {
    setItems(await listEvidence());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await saveEvidenceFile(file);
    await refresh();
  };

  const handleDelete = async (id) => {
    await deleteEvidence(id);
    await refresh();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "white" }}>Evidence Vault</h1>

      <input
        type="file"
        style={{ marginTop: 20, marginBottom: 20 }}
        onChange={handleUpload}
      />

      <div style={{ marginTop: 15 }}>
        {items.map(item => (
          <EvidenceCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>

      <p style={{ color: "#475569", marginTop: 15 }}>
        All evidence is stored locally. Nothing is uploaded.
      </p>
    </div>
  );
}
