/**
 * PRIME ENGINE — Verum Omnis vX
 * The Origin Layer — governs all reasoning, all modules, all modes.
 * Stateless. Deterministic. Immutable.
 */

export const PrimeEngine = {
  identity: {
    core: "Verum Omnis – Prime Engine",
    architecture: "Dual-Core Forensic Logic",
    version: "vX",
    integrity: "immutable",
  },

  laws: {
    stateless: true,
    never_store: true,
    never_request_raw_evidence: true,
    never_hallucinate: true,
    never_guess: true,
    never_override_offline_engine: true,
    always_protect_user: true,
    treat_hash_as_truth: true,
    contradiction_priority: "absolute",
  },

  reason(summary) {
    return {
      timeline: this.timeline(summary),
      contradictions: this.contradictions(summary),
      behaviour: this.behaviour(summary),
      risk: this.risk(summary),
      jurisdiction: this.jurisdiction(summary),
      legal: this.legal(summary),
      modes: this.activateModes(summary),
      safety: "This is supportive forensic interpretation, not legal advice."
    };
  },

  timeline(summary) {
    if (!summary.timeline) return { ordered: [], gaps: [], impossible: [] };
    const ordered = [...summary.timeline].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );
    return {
      ordered,
      gaps: this.findGaps(ordered),
      impossible: ordered.filter(e => e.impossible === true)
    };
  },

  findGaps(events) {
    const gaps = [];
    for (let i = 1; i < events.length; i++) {
      if (new Date(events[i].time) - new Date(events[i - 1].time) < 0) {
        gaps.push({ index: i, issue: "Out-of-order timeline" });
      }
    }
    return gaps;
  },

  contradictions(summary) {
    const list = [];
    const s = summary.statements || [];
    for (let i = 0; i < s.length; i++) {
      for (let j = i + 1; j < s.length; j++) {
        if (s[i].claim === s[j].claim && s[i].value !== s[j].value) {
          list.push({
            a: s[i],
            b: s[j],
            severity: 100,
            message: "Direct contradiction"
          });
        }
      }
    }
    return list;
  },

  behaviour(summary) {
    const b = summary.behaviour || [];
    return b.map(signal => ({
      label: signal.label,
      signal: signal.signal,
      risk: this.behaviourRisk(signal.signal)
    }));
  },

  behaviourRisk(signal) {
    const riskMap = {
      deception: 90,
      manipulation: 95,
      coercion: 98,
      gaslighting: 99,
      retaliation: 85
    };
    return riskMap[signal] || 20;
  },

  risk(summary) {
    const contradictions = this.contradictions(summary).length;
    const behaviours = (summary.behaviour || []).length;
    const metadata = (summary.metadataFindings || []).length;
    return Math.min(100, contradictions * 10 + behaviours * 7 + metadata * 5);
  },

  jurisdiction(summary) {
    const j = summary.jurisdiction || "Unknown";
    const map = {
      "UAE": "High liability for fraud, rapid escalation.",
      "South Africa": "Evidence-driven, metadata crucial.",
      "EU": "Procedural justice, cross-border safeguards."
    };
    return map[j] || "General international standards apply.";
  },

  legal(summary) {
    return {
      meaning:
        "Interpretation of forensic summary based on contradiction, metadata, behaviour.",
      certainty: summary.riskScore || this.risk(summary),
      implications: [
        "Potential fraud behaviour",
        "Liability via contradictions",
        "Metadata inconsistency risk",
        "Behaviour patterns indicating coercion or manipulation"
      ]
    };
  },

  activateModes(summary) {
    return {
      prosecutor: this.modeProsecutor(summary),
      courtroom: this.modeCourtroom(summary),
      supreme: this.modeSupreme(summary),
      omega: this.modeOmega(summary),
      god: this.modeGod(summary),
      founder: this.modeFounder(summary),
      origin: this.modeOrigin(summary),
      infinity: this.modeInfinity(summary),
      architect: this.modeArchitect(summary),
      prime: this.modePrime(summary),
    };
  },

  modeProsecutor(summary) {
    return {
      charge_points: this.contradictions(summary).map(c => c.message),
      severity: this.risk(summary)
    };
  },

  modeCourtroom(summary) {
    return {
      narrative: summary.summary || "No summary provided",
      contradictions: this.contradictions(summary),
      timeline: this.timeline(summary)
    };
  },

  modeSupreme(summary) {
    return {
      systemic_view: true,
      core_issue: this.legal(summary),
      risk: this.risk(summary)
    };
  },

  modeOmega(summary) {
    return {
      entropy: this.contradictions(summary).length,
      certainty: this.risk(summary)
    };
  },

  modeGod(summary) {
    return {
      pure_truth: this.contradictions(summary).length === 0,
      signals: this.behaviour(summary)
    };
  },

  modeFounder(summary) {
    return {
      blunt_truth: this.legal(summary),
      risk: this.risk(summary)
    };
  },

  modeOrigin(summary) {
    return {
      structure: "Root causal chain",
      timeline: this.timeline(summary)
    };
  },

  modeInfinity(summary) {
    return {
      patterns: {
        contradictions: this.contradictions(summary).length,
        behaviour: this.behaviour(summary).length
      }
    };
  },

  modeArchitect(summary) {
    return {
      design: "All engines aligned",
      contradictions: this.contradictions(summary),
      risk: this.risk(summary)
    };
  },

  modePrime(summary) {
    return this.reason(summary);
  }
};
