import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

import logo from "../assets/verum_logo.png";      // ensure you have this
import watermark from "../assets/verum_logo.png"; // same logo but faded

/*
  MODULE 16: PDF Generator (Verum Omnis v5.2.x)
  ---------------------------------------------
  Produces:
    - PDF 1.7
    - Logo top center
    - Watermark center (faint)
    - SHA-512 hash printed bottom-right
    - QR code with verification metadata
*/

async function computeSHA512(text) {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-512", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function generateVerumPDF(narrativeText) {
  // Create PDF
  const pdf = await PDFDocument.create({ updateMetadata: true });
  pdf.setCreator("Verum Omnis Forensic Engine");
  pdf.setProducer("Verum Omnis PDF Template v5.2.x");
  pdf.setTitle("Verum Omnis Forensic Report");

  const page = pdf.addPage([595, 842]); // A4
  const { height, width } = page.getSize();

  // FONT
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  // LOGO TOP
  const logoBytes = await fetch(logo).then(r => r.arrayBuffer());
  const logoImg = await pdf.embedPng(logoBytes);
  const logoDims = logoImg.scale(0.25);

  page.drawImage(logoImg, {
    x: (width - logoDims.width) / 2,
    y: height - 120,
    width: logoDims.width,
    height: logoDims.height
  });

  // WATERMARK
  const wmBytes = await fetch(watermark).then(r => r.arrayBuffer());
  const wmImg = await pdf.embedPng(wmBytes);
  const wmDims = wmImg.scale(0.5);

  page.drawImage(wmImg, {
    x: (width - wmDims.width) / 2,
    y: (height - wmDims.height) / 2,
    width: wmDims.width,
    height: wmDims.height,
    opacity: 0.08
  });

  // TEXT
  const textMargin = 50;
  const narrativeLines = narrativeText.split("\n");

  let y = height - 180;
  narrativeLines.forEach(line => {
    page.drawText(line, {
      x: textMargin,
      y,
      size: 10,
      font,
      color: rgb(0, 0, 0)
    });
    y -= 14;
  });

  // HASH
  const hash = await computeSHA512(narrativeText);

  page.drawText("✔ Patent Pending Verum Omnis", {
    x: width - 260,
    y: 40,
    size: 9,
    font,
    color: rgb(0, 0, 0)
  });

  page.drawText(hash.substring(0, 24) + "...", {
    x: width - 260,
    y: 25,
    size: 8,
    font,
    color: rgb(0, 0, 0)
  });

  // QR CODE
  const qrData = await QRCode.toDataURL(
    JSON.stringify({
      hash,
      generated: new Date().toISOString()
    }),
    { margin: 0 }
  );

  const qrBytes = await fetch(qrData).then(r => r.arrayBuffer());
  const qrImg = await pdf.embedPng(qrBytes);

  page.drawImage(qrImg, {
    x: width - 90,
    y: 20,
    width: 70,
    height: 70
  });

  // Final PDF bytes
  const bytes = await pdf.save({ useObjectStreams: false });

  return new Blob([bytes], { type: "application/pdf" });
}
