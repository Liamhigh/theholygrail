import { PrimeEngine } from "./src/core/primeEngine";

import { runPrime } from "./src/utils/runPrime";

async function runTripleVerification(summary) {
  const prime = runPrime(summary);

  const res = await fetch("/api/verum", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...summary, prime })
  });

  return await res.json();
}

