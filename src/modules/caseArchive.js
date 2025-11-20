/*
  MODULE 15: LOCAL CASE ARCHIVE + CASE LIFECYCLE ENGINE
  -----------------------------------------------------
  Offline, encrypted, stateless.
  Every case is stored as:
   - metadata
   - lifecycle stage
   - evidence list (hash + filename)
   - reports
   - disclosure history
*/

import * as Crypto from "crypto-js";

const KEY = "verum_case_archive";
const PASS = "LOCAL_ONLY_VERUM_KEY";

// ---- storage helpers ----
function loadArchive() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];

  try {
    const json = Crypto.AES.decrypt(raw, PASS).toString(Crypto.enc.Utf8);
    return JSON.parse(json);
  } catch {
    return [];
  }
}

function saveArchive(data) {
  const encrypted = Crypto.AES.encrypt(
    JSON.stringify(data),
    PASS
  ).toString();

  localStorage.setItem(KEY, encrypted);
}

// ---- case creation ----
export function createCase({ title }) {
  const id = "CASE-" + Date.now();

  const archive = loadArchive();
  archive.push({
    id,
    title,
    created: new Date().toISOString(),
    lifecycle: "Initialisation",
    evidence: [],
    reports: [],
    disclosure: [],
    actions: []
  });

  saveArchive(archive);
  return id;
}

// ---- load one case ----
export function getCase(id) {
  const archive = loadArchive();
  return archive.find(c => c.id === id) || null;
}

// ---- update lifecycle ----
export function setLifecycle(id, stage) {
  const archive = loadArchive();
  const c = archive.find(x => x.id === id);
  if (!c) return;

  c.lifecycle = stage;
  c.actions.push({
    type: "LIFECYCLE_UPDATE",
    to: stage,
    time: new Date().toISOString()
  });

  saveArchive(archive);
}

// ---- add evidence ----
export function addEvidence(id, { filename, hash }) {
  const archive = loadArchive();
  const c = archive.find(x => x.id === id);
  if (!c) return;

  c.evidence.push({ filename, hash });
  c.lifecycle = "Evidence Intake";
  c.actions.push({
    type: "EVIDENCE_ADDED",
    filename,
    hash,
    time: new Date().toISOString()
  });

  saveArchive(archive);
}

// ---- add report ----
export function addReport(id, reportText) {
  const archive = loadArchive();
  const c = archive.find(x => x.id === id);
  if (!c) return;

  c.reports.push({
    text: reportText,
    time: new Date().toISOString()
  });

  c.lifecycle = "Analysis Complete";

  saveArchive(archive);
}

// ---- log disclosure ----
export function logDisclosure(id, target) {
  const archive = loadArchive();
  const c = archive.find(x => x.id === id);
  if (!c) return;

  c.disclosure.push({
    target,
    time: new Date().toISOString()
  });

  c.lifecycle = "Disclosure Sent";

  saveArchive(archive);
}

// ---- check escalation deadlines ----
export function evaluateEscalation() {
  const archive = loadArchive();
  const now = new Date();

  for (let c of archive) {
    if (c.lifecycle !== "Disclosure Sent") continue;

    // last disclosure time
    const last = c.disclosure[c.disclosure.length - 1];
    if (!last) continue;

    const d = new Date(last.time);
    const diff = (now - d) / (1000 * 60 * 60 * 24);

    if (diff >= 2) {
      c.lifecycle = "Escalation Required";
    }
  }

  saveArchive(archive);
}

// ---- list cases ----
export function listCases() {
  return loadArchive();
}
