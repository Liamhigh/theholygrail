/*
  Verum Omnis – Module 6
  Institution Dashboard Engine
  Offline + Stateless
*/

import { getAllReportsMeta } from "../storage/localVault";

export async function getDashboardStats() {
  const reports = await getAllReportsMeta();

  const total = reports.length;

  const lastTen = reports
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  const highRisk = reports.filter(r => r.riskScore >= 70).length;
  const mediumRisk = reports.filter(r => r.riskScore >= 40 && r.riskScore < 70).length;
  const lowRisk = reports.filter(r => r.riskScore < 40).length;

  return {
    totalProcessed: total,
    highRisk,
    mediumRisk,
    lowRisk,
    lastTen
  };
}
