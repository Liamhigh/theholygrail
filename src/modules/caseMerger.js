/*
  Verum Omnis — Module 4
  Merges local case data into one unified narrative + PDF output.
*/

import jsPDF from "jspdf";

// Merge data into one canonical narrative
export function buildNarrative(merged) {
  const {
    summary,
    contradictions,
    behaviour,
    timeline,
    metadata,
    hash
  } = merged;

  return `
VERUM OMNIS – MASTER FORENSIC NARRATIVE
-----------------------------------------

SHA-512: ${hash}

SUMMARY
${summary}

KEY CONTRADICTIONS
${contradictions.map(c => `• ${c.text} (severity ${c.severity})`).join("\n")}

BEHAVIOURAL INDICATORS
${behaviour.map(b => `• ${b}`).join("\n")}

TIMELINE INTERPRETATION
${timeline.map(t => `• ${t.time}: ${t.event}`).join("\n")}

METADATA FINDINGS
${metadata.map(m => `• ${m}`).join("\n")}

WHAT THIS MEANS
This narrative explains the core factual issues detected by the Verum Omnis engine.

DISCLAIMER
This is supportive forensic interpretation, not legal advice.
  `;
}

// Creates a PDF using jsPDF
export async function buildPDF(narrative) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const lines = narrative.split("\n");
  let y = 40;

  doc.setFont("Helvetica", "normal");

  for (let line of lines) {
    doc.text(line, 40, y);
    y += 20;
    if (y > 780) {
      doc.addPage();
      y = 40;
    }
  }

  return doc.output("blob");
}
