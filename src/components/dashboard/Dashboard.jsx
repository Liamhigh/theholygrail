import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../../modules/dashboardEngine";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const d = await getDashboardStats();
      setStats(d);
    })();
  }, []);

  if (!stats) return <p style={{ color: "white", padding: 20 }}>Loading…</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "white", marginBottom: 15 }}>Institution Dashboard</h1>

      <div style={{
        background: "#1e293b",
        padding: 15,
        borderRadius: 8,
        marginBottom: 20
      }}>
        <h3 style={{ color: "white" }}>Summary</h3>
        <p style={{ color: "white" }}>Total Documents Processed: {stats.totalProcessed}</p>
        <p style={{ color: "#ef4444" }}>High Risk: {stats.highRisk}</p>
        <p style={{ color: "#f59e0b" }}>Medium Risk: {stats.mediumRisk}</p>
        <p style={{ color: "#22c55e" }}>Low Risk: {stats.lowRisk}</p>
      </div>

      <div style={{
        background: "#1e293b",
        padding: 15,
        borderRadius: 8
      }}>
        <h3 style={{ color: "white" }}>Last 10 Reports</h3>
        {stats.lastTen.map((r, i) => (
          <div key={i} style={{
            padding: 10,
            borderBottom: "1px solid #334155"
          }}>
            <p style={{ color: "white" }}><b>{r.filename}</b></p>
            <p style={{ color: "#94a3b8" }}>Risk Score: {r.riskScore}</p>
            <p style={{ color: "#64748b" }}>
              {new Date(r.timestamp).toLocaleString()}
            </p>
          </div>
        ))}

        {stats.lastTen.length === 0 && (
          <p style={{ color: "white" }}>No reports yet.</p>
        )}
      </div>
    </div>
  );
}
