/*
  Verum Omnis – Module 5
  Offline Tax Return Calculator + PDF Generator
*/

import jsPDF from "jspdf";

export function calculateTax({ income, expenses }) {
  const taxable = Math.max(0, income - expenses);
  const tax = taxable * 0.18; // 18% — example; user sees "approximate"
  const discount = tax * 0.50;
  const finalAmount = tax - discount;

  return {
    taxable,
    tax,
    discount,
    finalAmount
  };
}

export async function buildTaxPDF(data) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const lines = [
    "VERUM OMNIS – TAX RETURN (OFFLINE MODULE)",
    "------------------------------------------",
    "",
    `Income: $${data.income}`,
    `Expenses: $${data.expenses}`,
    `Taxable Income: $${data.taxable}`,
    "",
    `Standard Tax (18%): $${data.tax.toFixed(2)}`,
    `Verum Omnis 50% Discount: -$${data.discount.toFixed(2)}`,
    "",
    `TOTAL PAYABLE: $${data.finalAmount.toFixed(2)}`,
    "",
    "NOTE:",
    "This is an offline approximate calculation.",
    "Seek advice for official tax submission."
  ];

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
