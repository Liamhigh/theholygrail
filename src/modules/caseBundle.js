/*
  MODULE 12 – ELECTRONIC CASE BUNDLE & TIMELINE VISUALIZER
  --------------------------------------------------------
  Takes all PDFs from Module 11 + summary metadata
  Generates:
    - Exhibit Index
    - Timeline Graphic Page
    - Auto-numbered pages
    - Final Court-Ready Bundle
*/

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateCaseBundle({
  finalReportPDF,
  summaryJSON
}) {
  const bundle = await PDFDocument.create();
  const font = await bundle.embedFont(StandardFonts.Helvetica);

  // --- 1. EXHIBIT INDEX PAGE ---
  const indexPage = bundle.addPage();
  indexPage.drawText("VERUM OMNIS – CASE BUNDLE INDEX", {
    x: 40, y: indexPage.getHeight() - 60,
    size: 22, font, color: rgb(0.2, 0.6, 1)
  });

  const exhibits = [
    "Exhibit A – Evidence Summary",
    "Exhibit B – Timeline Diagram",
    "Exhibit C – Contradictions Map",
    "Exhibit D – Behaviour Analysis",
    "Exhibit E – Metadata Report",
    "Exhibit F – Rights Map",
    "Exhibit G – Final Forensic Report"
  ];

  let y = indexPage.getHeight() - 110;
  exhibits.forEach(ex => {
    indexPage.drawText(ex, {
      x: 50, y, size: 14, font, color: rgb(1, 1, 1)
    });
    y -= 24;
  });

  // --- 2. TIMELINE DIAGRAM PAGE ---
  const tPage = bundle.addPage();
  const w = tPage.getWidth(), h = tPage.getHeight();

  tPage.drawText("TIMELINE DIAGRAM", {
    x: 40, y: h - 60,
    size: 20, font, color: rgb(0.3, 0.7, 1)
  });

  // draw nodes as a simple horizontal path
  let x = 80;
  const step = (w - 160) / summaryJSON.timeline.length;

  summaryJSON.timeline.forEach((event, i) => {
    // circle
    tPage.drawCircle({
      x, y: h/2, size: 6, color: rgb(0.8,0.8,1)
    });
    // text
    tPage.drawText(event.date + " – " + event.title, {
      x: x - 20, y: h/2 - 40, size: 10, font
    });
    x += step;
  });

  // --- 3. MERGE FINAL REPORT (from Module 11) ---
  const fr = await PDFDocument.load(finalReportPDF);
  const frPages = await bundle.copyPages(fr, fr.getPageIndices());
  frPages.forEach(p => bundle.addPage(p));

  // --- 4. ADD PAGE NUMBERS ---
  bundle.getPages().forEach((p, idx) => {
    p.drawText(String(idx + 1), {
      x: p.getWidth() / 2,
      y: 20,
      size: 10,
      font,
      color: rgb(0.7,0.7,0.7)
    });
  });

  // --- FINAL OUTPUT ---
  return await bundle.save();
}
