import { interpretForensicSummary } from "./usePrime";

/**
 * EXPORTED MAIN ENGINE
 * Call this with ANY forensic summary
 */
export async function runForensic(summary) {
  return await interpretForensicSummary(summary);
}
