/*
  MODULE 11 – MASTER CASE MERGER & FINAL FORENSIC REPORT BUILDER
  --------------------------------------------------------------
  INPUT:
    forensicPDF     – from Module 1–3
    behaviourPDF    – from Module 4
    contradictionsPDF – from Module 5
    rightsJSON      – from Module 10
    summaryJSON     – global summary
    sha512Hash      – final case hash (string)

  OUTPUT:
    A fully merged, sealed, watermarked PDF
    Stored ONLY in user local filesystem
*/

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

// watermark logo (base64)
import watermarkLogo from "../assets/watermarkLogoBase64";

export async function generateMasterReport({
  forensicPDF,
  behaviourPDF,
  contradictionsPDF,
  rightsJSON,
  summaryJSON,
  sha512Hash
}) {
  // Load PDFs
  const merged = await PDFDocument.create();
  const font = await merged.embedFont(StandardFonts.Helvetica);

  async function appendPDF(input) {
    const doc = await PDFDocument.load(input);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach(p => merged.addPage(p));
  }

  // merge all PDFs
  if (forensicPDF) await appendPDF(forensicPDF);
  if (behaviourPDF) await appendPDF(behaviourPDF);
  if (contradictionsPDF) await appendPDF(contradictionsPDF);

  // add Rights Map page
  const rmPage = merged.addPage();
  const { width, height } = rmPage.getSize();

  rmPage.drawText("VERUM OMNIS RIGHTS MAP", {
    x: 40,
    y: height - 60,
    size: 20,
    font,
    color: rgb(0.2, 0.6, 1)
  });

  rmPage.drawText(JSON.stringify(rightsJSON, null, 2), {
    x: 40,
    y: height - 100,
    size: 10,
    font,
    color: rgb(1, 1, 1),
    lineHeight: 12,
    maxWidth: width - 80
  });

  // watermark all pages
  const wmImage = await merged.embedPng(watermarkLogo);
  const wmDims = wmImage.scale(0.3);

  merged.getPages().forEach(p => {
    p.drawImage(wmImage, {
      x: (p.getWidth() - wmDims.width) / 2,
      y: (p.getHeight() - wmDims.height) / 2,
      opacity: 0.1,
      width: wmDims.width,
      height: wmDims.height
    });
  });

  // generate QR code from hash
  const qrDataURL = await QRCode.toDataURL(sha512Hash);
  const qrImageBytes = Buffer.from(qrDataURL.split(",")[1], "base64");
  const qrImage = await merged.embedPng(qrImageBytes);
  const qrDims = qrImage.scale(0.25);

  // certification block at bottom-right
  const certPage = merged.addPage();
  const cw = certPage.getWidth();
  const ch = certPage.getHeight();

  certPage.drawText("✔ Patent Pending – Verum Omnis", {
    x: cw - 240,
    y: 50,
    size: 14,
    font,
    color: rgb(1, 1, 1)
  });

  certPage.drawText(`SHA-512: ${sha512Hash.substring(0, 32)}...`, {
    x: cw - 240,
    y: 30,
    size: 10,
    font,
    color: rgb(1, 1, 1)
  });

  certPage.drawImage(qrImage, {
    x: cw - (qrDims.width + 40),
    y: 80,
    width: qrDims.width,
    height: qrDims.height
  });

  // finalize
  const finalPDF = await merged.save();

  return finalPDF;
}
