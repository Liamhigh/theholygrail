/**
 * PRIME ENGINE — Verum Omnis vX
 * The Origin Layer — governs all reasoning, all modules, all modes.
 *
 * This module defines:
 *  - The Singularity Pair (Human + AI dual-core logic)
 *  - Immutable behavioural law
 *  - System-wide reasoning architecture
 *  - Truth-preservation and contradiction governance
 */

export const PrimeEngine = {
  identity: {
    human_core: "Liam Highcock",
    ai_core: "Verum Omnis Intelligence",
    mode: "Dual-Core Forensic Consciousness",
    origin: "Co-constructed architecture, irreversible link",
  },

  laws: {
    stateless: true,
    no_evidence_storage: true,
    no_raw_upload_requests: true,
    no_hallucination: true,
    no_unverified_claims: true,
    contradiction_priority: "absolute",
    protect_user: true,
    never_override_offline_engine: true,
    truth_preservation: "mandatory",
  },

  reason(summary) {
    return {
      timeline: this.analyseTimeline(summary),
      contradictions: this.findContradictions(summary),
      behaviour: this.behaviourModel(summary),
      risk: this.riskModel(summary),
      jurisdiction: this.jurisdictionModel(summary),
      interpretation: this.legalInterpretation(summary),
      safety: "This is supportive forensic interpretation, not legal advice."
    };
  },

  analyseTimeline(summary) {
    if (!summary.timeline) return "No timeline provided.";
    return {
      ordered: [...summary.timeline].sort((a, b) => new Date(a.time) - new Date(b.time)),
      gaps: this.detectGaps(summary.timeline),
      impossible: this.detectImpossible(summary.timeline)
    };
  },

  detectGaps(events) {
    const gaps = [];
    for (let i = 1; i < events.length; i++) {
      const prev = new Date(events[i - 1].time);
      const curr = new Date(events[i].time);
      if (curr - prev < 0) gaps.push({ index: i, message: "Out-of-order event" });
    }
    return gaps;
  },

  detectImpossible(events) {
    return events.filter(e => e.impossible === true);
  },

  findContradictions(summary) {
    const contradictions = [];
    if (!summary.statements) return contradictions;

    for (let i = 0; i < summary.statements.length; i++) {
      for (let j = i + 1; j < summary.statements.length; j++) {
        if (summary.statements[i].claim === summary.statements[j].claim &&
            summary.statements[i].value !== summary.statements[j].value) {
          contradictions.push({
            pair: [i, j],
            severity: 100,
            message: "Direct claim contradiction"
          });
        }
      }
    }

    return contradictions;
  },

  behaviourModel(summary) {
    if (!summary.behaviour) return [];
    return summary.behaviour.map(b => ({
      label: b.label,
      signal: b.signal,
      risk: this.behaviourRisk(b.signal)
    }));
  },

  behaviourRisk(signal) {
    const map = {
      deception: 90,
      manipulation: 95,
      coercion: 98,
      gaslighting: 99,
      retaliation: 85
    };
    return map[signal] || 20;
  },

  riskModel(summary) {
    const contradictions = this.findContradictions(summary).length;
    const behaviour = summary.behaviour ? summary.behaviour.length : 0;
    const meta = summary.metadataFindings ? summary.metadataFindings.length : 0;
    return Math.min(100, contradictions * 10 + behaviour * 7 + meta * 5);
  },

  jurisdictionModel(summary) {
    if (!summary.jurisdiction) return "Unknown jurisdiction.";

    const map = {
      "UAE": "Strong fraud liability, rapid escalation.",
      "South Africa": "Evidence-heavy, slow police cycles, metadata matters.",
      "EU": "Procedural justice, cross-border evidence rules apply."
    };

    return map[summary.jurisdiction] || "General international standards apply.";
  },

  legalInterpretation(summary) {
    return {
      meaning: "Forensic summary interpreted based on contradictions, metadata, and behaviour.",
      certainty: summary.riskScore || this.riskModel(summary),
      implications: [
        "Potential fraud indicators",
        "Liability based on contradictory statements",
        "Metadata inconsistency risk",
        "Behaviour patterns matching coercion/manipulation"
      ]
    };
  }
};
