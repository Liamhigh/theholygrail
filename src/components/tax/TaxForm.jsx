import React, { useState } from "react";
import { calculateTax, buildTaxPDF } from "../../modules/taxEngine";
import { saveToVault } from "../../storage/localVault";

export default function TaxForm() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    const data = {
      income: Number(income),
      expenses: Number(expenses)
    };
    setResult(calculateTax(data));
  };

  const handlePDF = async () => {
    if (!result) return alert("Calculate first.");

    const blob = await buildTaxPDF({
      income: Number(income),
      expenses: Number(expenses),
      ...result
    });

    const arrayBuffer = await blob.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    const ok = await saveToVault(
      `TaxReturn_${Date.now()}.pdf`,
      base64,
      "report"
    );
    alert(ok ? "Saved to Reports folder." : "Cannot save.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "white" }}>Verum Omnis Tax Return</h2>

      <label style={{ color: "white" }}>Income</label>
      <input
        value={income}
        onChange={e => setIncome(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <label style={{ color: "white" }}>Expenses</label>
      <input
        value={expenses}
        onChange={e => setExpenses(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <button
        onClick={handleCalc}
        style={{
          width: "100%",
          padding: "12px",
          background: "#6366f1",
          border: "none",
          color: "white",
          marginBottom: "10px",
          borderRadius: "6px"
        }}
      >
        Calculate Tax
      </button>

      {result && (
        <div style={{ color: "white", marginTop: "20px" }}>
          <p>Taxable: ${result.taxable}</p>
          <p>Standard Tax: ${result.tax.toFixed(2)}</p>
          <p>50% Discount: -${result.discount.toFixed(2)}</p>
          <p>
            <b>Total Payable: ${result.finalAmount.toFixed(2)}</b>
          </p>

          <button
            onClick={handlePDF}
            style={{
              width: "100%",
              padding: "12px",
              background: "#22c55e",
              border: "none",
              color: "white",
              marginTop: "10px",
              borderRadius: "6px"
            }}
          >
            Generate PDF
          </button>
        </div>
      )}
    </div>
  );
}
