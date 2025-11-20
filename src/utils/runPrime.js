import { PrimeEngine } from "../core/primeEngine";

export function runPrime(summary) {
  try {
    return PrimeEngine.reason(summary);
  } catch (e) {
    return { error: "Prime Engine failed", details: e.message };
  }
}
