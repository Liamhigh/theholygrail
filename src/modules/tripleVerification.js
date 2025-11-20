/*
  MODULE 9 – Verum Omnis Triple Verification Engine
  -------------------------------------------------
  Runs three AI brains (A, B, C) through the API endpoint.
  Only returns output if all three models agree.
*/

async function callBrain(summary, mode) {
  const res = await fetch("/api/verum", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      summary,
      mode
    })
  });

  const data = await res.json();
  return data.output || data.output_text || "";
}

/*
  Brain roles:
  A = primary forensic reasoning
  B = legal interpretation clarity
  C = contradiction scanner + cross-check
*/

export async function tripleVerification(summaryJSON) {
  const [A, B, C] = await Promise.all([
    callBrain(summaryJSON, "primary"),
    callBrain(summaryJSON, "legal"),
    callBrain(summaryJSON, "crosscheck")
  ]);

  // Compare results
  const agreement =
    A.trim().substring(0, 500) === B.trim().substring(0, 500) &&
    B.trim().substring(0, 500) === C.trim().substring(0, 500);

  if (agreement) {
    return {
      mode: "verified",
      output: A,
      agreement: true,
      engines: { A, B, C }
    };
  }

  // Contradiction matrix if they differ
  return {
    mode: "disagreement",
    agreement: false,
    matrix: {
      AB: A === B,
      AC: A === C,
      BC: B === C
    },
    engines: { A, B, C },
    message:
      "The three forensic engines produced different interpretations. Additional clarification is required."
  };
}

