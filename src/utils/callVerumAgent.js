export async function callVerumAgent(summary) {
  try {
    const res = await fetch("/api/verum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary })
    });

    const data = await res.json();
    return data.output || "No response from Verum backend.";
  } catch (err) {
    console.error("Verum API error:", err);
    return "Backend error";
  }
}
