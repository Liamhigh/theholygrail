import { PrimeEngine } from "../../modules/prime.js";

/**
 * PRIME ENGINE BRIDGE
 * This connects:
 *   - Offline forensic summary (APK)
 *   - Web forensic summary
 *   - API relay (OpenAI Agent)
 *   - Output renderer (web + apk)
 */

export function runPrimeEngine(summary) {
  try {
    return PrimeEngine.reason(summary);
  } catch (err) {
    return {
      error: true,
      message: "Prime Engine failed to interpret summary.",
      details: err.message
    };
  }
}
