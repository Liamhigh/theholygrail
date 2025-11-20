export function renderPrimeResults(result) {
  const offline = result.offline;
  const online = result.online;

  return `
    <h2>Prime Engine — Offline Findings</h2>
    <pre>${JSON.stringify(offline, null, 2)}</pre>

    <h2>Verum Omnis Online Legal Interpretation</h2>
    <pre>${JSON.stringify(online, null, 2)}</pre>
  `;
}
