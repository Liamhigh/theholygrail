/*
  MODULE 14: AUTO EMAIL PACK + FOLLOW-UP REMINDER ENGINE
  ------------------------------------------------------
  Offline-only engine. No email sent automatically.
  Creates:
    - Pre-filled email text
    - mailto: links
    - Optional .eml downloads
    - Local follow-up reminders
*/

import * as Crypto from "crypto-js";

// ---- helper: local reminder storage ----
const REMINDER_KEY = "verum_reminders";

export function saveReminder(type, daysFromNow) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);

  const reminders = getReminders();
  reminders.push({ type, due: date.toISOString() });

  const encrypted = Crypto.AES.encrypt(
    JSON.stringify(reminders),
    "LOCAL_ONLY_VERUM_KEY"
  ).toString();

  localStorage.setItem(REMINDER_KEY, encrypted);
}

export function getReminders() {
  const data = localStorage.getItem(REMINDER_KEY);
  if (!data) return [];

  try {
    const decrypted = Crypto.AES.decrypt(
      data,
      "LOCAL_ONLY_VERUM_KEY"
    ).toString(Crypto.enc.Utf8);

    return JSON.parse(decrypted);
  } catch {
    return [];
  }
}

// ---- build email text ----
export function buildEmail({
  institution,
  summary,
  policePDF,
  bankPDF,
  hash
}) {
  const greeting =
    institution === "Police"
      ? "Dear Officer,"
      : institution === "Bank"
      ? "Dear Fraud Department,"
      : "Dear Sir/Madam,";

  return `
${greeting}

Please find attached a safe-disclosure version of a forensic report produced using the Verum Omnis forensic engine. It includes:

• Timeline integrity findings
• Contradiction map
• Behavioural indicators
• Metadata anomalies
• Fraud/liability assessment
• Case Hash: ${hash}

The full raw evidence remains secured on my device.

Attached:
• ${institution} Disclosure Pack (PDF)
• Case Summary
• SHA-512 hash list

Regards,
Protected Party (Victim)
`;
}

// ---- mailto generator ----
export function generateMailtoLink(institution, body) {
  const email =
    institution === "Police"
      ? "saps@localstation.gov.za"
      : institution === "Bank"
      ? "fraud@bank.com"
      : "office@institution.com";

  return `mailto:${email}?subject=Forensic Evidence Disclosure&body=${encodeURIComponent(
    body
  )}`;
}
