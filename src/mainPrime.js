import { runForensic } from "./core/forensicEngine";
import { renderPrimeResults } from "./ui/PrimeResultRenderer";

window.processSummary = async function(summary) {
  const result = await runForensic(summary);
  document.getElementById("results").innerHTML = renderPrimeResults(result);
};
