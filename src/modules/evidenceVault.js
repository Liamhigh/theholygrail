/*
  Verum Omnis – Module 8
  Offline Evidence Vault
  Stores: images, audio, video, PDF, docx, text
  Zero cloud storage; device-only.
*/

import SHA512 from "js-sha512";

export async function saveEvidenceFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);

  // Compute SHA-512 hash
  const hashHex = SHA512(uint8);

  const evidenceObject = {
    id: hashHex.substring(0, 32),
    name: file.name,
    type: file.type,
    hash: hashHex,
    size: file.size,
    addedAt: new Date().toISOString()
  };

  // IndexedDB store
  await storeInIndexedDB("evidence", evidenceObject);

  return evidenceObject;
}

export async function listEvidence() {
  return await getAllFromIndexedDB("evidence");
}

export async function deleteEvidence(id) {
  return await deleteFromIndexedDB("evidence", id);
}

/**************************************************************
 IndexedDB (Web) / SQLite (APK via Capacitor)
**************************************************************/
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("VerumOmnisVault", 1);
    request.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("evidence")) {
        db.createObjectStore("evidence", { keyPath: "id" });
      }
    };
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = reject;
  });
}

async function storeInIndexedDB(store, record) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(record);
    tx.oncomplete = resolve;
    tx.onerror = reject;
  });
}

async function getAllFromIndexedDB(store) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = reject;
  });
}

async function deleteFromIndexedDB(store, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    const req = tx.objectStore(store).delete(key);
    req.onsuccess = resolve;
    req.onerror = reject;
  });
}
