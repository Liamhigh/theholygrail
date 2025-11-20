import { runPrimeEngine } from "./primeBridge";

export async function interpretForensicSummary(summary) {
  const localResult = runPrimeEngine(summary);

  // If no online mode, return local Prime Engine only
  if (!navigator.onLine) return localResult;

  // If online, send to API Agent for legal interpretation
  try {
    const res = await fetch("/api/verum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary })
    });

    const data = await res.json();

    return {
      offline: localResult,
      online: data.output
    };

  } catch (e) {
    return {
      offline: localResult,
      online: "Online legal interpretation unavailable."
    };
  }
}
