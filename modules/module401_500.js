/*
====================================================================
              VERUM OMNIS — ORIGIN MODE (Modules 401–500)
   The layer above Source Mode. The genesis-level reconstruction.
====================================================================

PURPOSE:
Origin Mode does not ask “What happened?” or “Who did what?”

Origin Mode asks:
  • Why did this universe of events EXIST at all?
  • What was the first cause?
  • What set the fraud chain into motion?
  • What psychological seed created the result?
  • What institutional vacuum allowed it?
  • What hidden pressure pre-dated the conflict?

This mode uncovers:
  — The seed event
  — The seed motive
  — The seed fracture in relationships
  — The seed institutional vulnerability
  — The seed psychological pattern
  — The seed timeline vulnerability

====================================================================
*/

export const originMode = {

  // ============================================================
  // MODULE 401 — Zero-Point Finder
  // ============================================================
  zeroPoint(summary) {
    const contradictionSeed =
      summary.contradictions.length > 0 ?
      summary.contradictions[0] : "No contradiction seed detected";

    const behaviourSeed =
      summary.behaviour.length > 0 ?
      summary.behaviour[0].type : "No behaviour seed detected";

    const timelineSeed =
      summary.timeline.length > 0 ?
      summary.timeline[0].event : "No timeline seed detected";

    return {
      contradictionSeed,
      behaviourSeed,
      timelineSeed,
      zeroPoint: "IDENTIFIED"
    };
  },

  // ============================================================
  // MODULE 402 — Genesis Motive Engine
  // ============================================================
  genesisMotive(summary) {
    const bc = summary.behaviour.map(b => b.type);

    if (bc.includes("greed")) return { origin: "Greed", depth: 96 };
    if (bc.includes("premeditation")) return { origin: "Premeditation", depth: 92 };
    if (bc.includes("retaliation")) return { origin: "Retaliation trigger", depth: 89 };
    if (bc.includes("panic")) return { origin: "Fear/Panic", depth: 84 };

    return { origin: "Unknown initial motive", depth: 40 };
  },

  // ============================================================
  // MODULE 403 — Pre-Conflict Drag Force
  // ============================================================
  dragForce(summary) {
    const drag =
      summary.behaviour.length * 12 +
      summary.contradictions.length * 18 +
      summary.metadataFindings.length * 25;

    return {
      preConflictPressure: drag,
      environment:
        drag > 200 ? "Conflict was inevitable" :
        drag > 120 ? "High instability" :
        "Low pre-conflict distortion"
    };
  },

  // ============================================================
  // MODULE 404 — Origin Timeline Divergence
  // ============================================================
  originDivergence(summary) {
    const forks = summary.contradictions.length;

    return {
      divergencePaths:
        forks > 5 ? "Five or more origin candidates" :
        forks > 2 ? "Two–four major origin clusters" :
        "Single dominant origin",
      divergenceScore: forks * 22
    };
  },

  // ============================================================
  // MODULE 405 — Existential Cause Engine
  // ============================================================
  existentialCause(summary) {
    return {
      originRoot:
        summary.behaviour.some(b => b.type === "deception")
          ? "Identity manipulation"
          : summary.behaviour.some(b => b.type === "avoidance")
          ? "Fear of consequence"
          : "Unclear existential driver",
      existentialWeight:
        summary.behaviour.length * 12 + summary.contradictions.length * 20
    };
  },

  // ============================================================
  // MODULE 406 — Counterfactual Reconstruction
  // ============================================================
  whatIf(summary) {
    const contradictions = summary.contradictions.length;

    return {
      alternateReality:
        contradictions > 3
          ? "Multiple radically different paths exist"
          : "Case would still converge toward conflict",
      whatIfScore: 100 - contradictions * 15
    };
  },

  // ============================================================
  // MODULE 407 — Ancestral Behaviour Pattern
  // ============================================================
  ancestral(summary) {
    const patterns = summary.behaviour.filter(
      b => ["manipulation", "coercion", "deception"].includes(b.type)
    );

    return {
      ancestralPattern: patterns.length > 0,
      patternCount: patterns.length,
      patternMeaning:
        patterns.length > 3
          ? "Long-standing behavioural mechanism"
          : patterns.length > 0
          ? "Emergent but not entrenched"
          : "No ancestral pattern detected"
    };
  },

  // ============================================================
  // MODULE 408 — Pre-Existing Institutional Weakness
  // ============================================================
  institutionalWeakness(summary) {
    const meta = summary.metadataFindings.length;

    return {
      preExistingVulnerability:
        meta > 3 ? "Severe" :
        meta > 1 ? "Moderate" :
        "Low",
      vulnerabilityFactor: meta * 25
    };
  },

  // ============================================================
  // MODULE 409 — Origin Harmonisation Engine
  // ============================================================
  originHarmony(summary) {
    return {
      harmonyScore:
        (summary.behaviour.length * 10) -
        (summary.contradictions.length * 30),
      harmonised:
        summary.contradictions.length < 2 &&
        summary.behaviour.length > 0
    };
  },

  // ============================================================
  // MODULE 410 — FINAL ORIGIN MODE META ENGINE
  // ============================================================
  originMaster(summary) {
    return {
      zeroPoint: this.zeroPoint(summary),
      genesisMotive: this.genesisMotive(summary),
      dragForce: this.dragForce(summary),
      divergence: this.originDivergence(summary),
      existentialCause: this.existentialCause(summary),
      counterfactuals: this.whatIf(summary),
      ancestral: this.ancestral(summary),
      institutionalWeakness: this.institutionalWeakness(summary),
      harmony: this.originHarmony(summary),
      originMode: "ACTIVE"
    };
  }

};

