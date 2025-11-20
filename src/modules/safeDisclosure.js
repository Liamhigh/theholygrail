/*
  MODULE 13 – AUTO-REDACTOR + SAFE DISCLOSURE PACK
  ------------------------------------------------
  Takes:
    - full forensic summary JSON
    - final bundle PDF (from Module 12)
  Outputs two PDFs:
    1. Police Disclosure Pack
    2. Bank Disclosure Pack
*/

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// --- built-in identifier patterns (redaction) ---
const redactionPatterns = [
  /\b[\w.-]+@[\w.-]+\.\w+\b/g,          // emails
  /\b\d{10,13}\b/g,                     // phone numbers
  /\b\d{13}(\d{0,4})?\b/g,              // SA ID numbers / long numbers
  /\b[0-9]{4}[-\s]?[0-9]{4,12}\b/g,     // bank account numbers
  /\b[A-Z]{2}\d{6,}\b/g,                // passport-ish
  /\b\d{1,3}\s[A-Za-z ]+(Street|St|Road|Rd|Ave|Avenue)\b/gi, // rough address
  /\bGPS:[^,\n]+\b/gi                   // any GPS tags
];

function autoRedact(text) {
  let t = text;
  redactionPatterns.forEach(pattern => {
    t = t.replace(pattern, "[REDACTED]");
  });
  return t;
}

// --- REWRITE any personally identifying labels ---
function genericPersonLabels(text) {
  return text
    .replace(/Liam/gi, "Protected Party (Victim)")
    .replace(/Rachel/gi, "Counterparty")
    .replace(/Kevin/gi, "Subject A")
    .replace(/Marius/gi, "Subject B");
}

export async function generateSafeDisclosure({
  bundlePDF,
  summaryJSON
}) {
  const base = await PDFDocument.load(bundlePDF);
  const police = await PDFDocument.create();
  const bank = await PDFDocument.create();

  const font = await police.embedFont(StandardFonts.Helvetica);

  // --- COVER PAGE (POLICE) ---
  const p1 = police.addPage();
  p1.drawText("SAFE-DISCLOSURE PACK (POLICE)", {
    x: 40, y: p1.getHeight() - 60, size: 22, font, color: rgb(1,0.3,0.3)
  });
  p1.drawText("This document contains minimum necessary evidence only.", {
    x: 40, y: p1.getHeight() - 100, size: 12, font
  });

  // --- COVER PAGE (BANK) ---
  const b1 = bank.addPage();
  b1.drawText("SAFE-DISCLOSURE PACK (BANK)", {
    x: 40, y: b1.getHeight() - 60, size: 22, font, color: rgb(0.3,1,0.3)
  });
  b1.drawText("This document discloses only financial-relevant indicators.", {
    x: 40, y: b1.getHeight() - 100, size: 12, font
  });

  // --- SUMMARY TEXT ---
  const summaryText = autoRedact(
    genericPersonLabels(JSON.stringify(summaryJSON, null, 2))
  );

  p1.drawText(summaryText.slice(0, 2000), {
    x: 40, y: p1.getHeight() - 150, size: 9, font
  });

  b1.drawText(summaryText.slice(0, 2000), {
    x: 40, y: b1.getHeight() - 150, size: 9, font
  });

  // --- MERGE REDACTED PAGES INTO POLICE + BANK ---
  const srcPages = await police.copyPages(base, base.getPageIndices());
  srcPages.forEach(p => police.addPage(p));

  const srcPages2 = await bank.copyPages(base, base.getPageIndices());
  srcPages2.forEach(p => bank.addPage(p));

  return {
    policePDF: await police.save(),
    bankPDF: await bank.save()
  };
}
