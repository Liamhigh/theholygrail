/*
=========================================================
        VERUM OMNIS – MONSTER MODULE 18 (Unified)
=========================================================

This is the merged master engine combining:

• Forensic Engine PDF logic
• Ideal Logic With Brains logic
• Master Archive v5.2.7 logic

It contains the unified contradiction, behavioural,
timeline, metadata, legal-mapping, risk, consensus,
institutional, escalation, and constitutional engines.

This is the “brain of brains”.
=========================================================
*/

export const module18 = {

  // =============================
  // 1. CONTRADICTION ENGINE
  // =============================
  contradictionScan(summary) {
    const contradictions = [];

    const scan = (a, b, rule) => {
      if (rule(a, b)) contradictions.push({ a, b, type: "contradiction" });
    };

    // Impossible timeline
    if (summary.timeline) {
      summary.timeline.forEach((ev, i) => {
        const next = summary.timeline[i + 1];
        if (!next) return;
        if (new Date(next.time) < new Date(ev.time)) {
          contradictions.push({
            type: "timeline_impossible",
            event1: ev,
            event2: next,
            severity: 90
          });
        }
      });
    }

    // Opposing statements
    if (summary.statements) {
      for (let i = 0; i < summary.statements.length; i++) {
        for (let j = i + 1; j < summary.statements.length; j++) {
          const A = summary.statements[i];
          const B = summary.statements[j];
          if (A.claim === B.claim && A.value !== B.value) {
            contradictions.push({
              type: "statement_conflict",
              A,
              B,
              severity: 80
            });
          }
        }
      }
    }

    return contradictions;
  },


  // =============================
  // 2. TIMELINE ENGINE
  // =============================
  buildTimeline(summary) {
    if (!summary.timeline) return [];

    return summary.timeline
      .map(t => ({
        time: t.time,
        event: t.event,
        source: t.source || "unknown",
        flags: []
      }))
      .sort((a, b) => new Date(a.time) - new Date(b.time));
  },


  // =============================
  // 3. METADATA RED-FLAG ENGINE
  // =============================
  metadataScan(summary) {
    const flags = [];

    const redFlags = {
      edited_pdf: 70,
      missing_metadata: 60,
      mismatched_hash: 100,
      timezone_shift: 50,
      spoof_signature: 90,
      compression_artifacts: 65
    };

    if (summary.metadataFindings) {
      summary.metadataFindings.forEach(f => {
        if (redFlags[f.type]) {
          flags.push({
            type: f.type,
            severity: redFlags[f.type]
          });
        }
      });
    }

    return flags;
  },


  // =============================
  // 4. BEHAVIOURAL ENGINE
  // =============================
  behaviourScan(summary) {
    const behaviours = [];

    const patterns = {
      gaslighting: ["you imagined it", "you're crazy", "you misunderstood"],
      coercion: ["you must", "or else", "do this now"],
      deception: ["I never said that", "I don’t remember"],
      retaliation: ["I'll make you regret", "you will be sorry"]
    };

    if (summary.behaviour) {
      summary.behaviour.forEach(b => {
        Object.keys(patterns).forEach(type => {
          patterns[type].forEach(p => {
            if (b.text && b.text.toLowerCase().includes(p)) {
              behaviours.push({
                type,
                excerpt: b.text,
                severity: 70
              });
            }
          });
        });
      });
    }

    return behaviours;
  },


  // =============================
  // 5. LEGAL MAPPING ENGINE
  // =============================
  legalMapping(summary) {
    return {
      criminal: summary.riskScore > 70 ? "High" : "Low",
      civil: summary.contradictions?.length > 0 ? "Present" : "Unclear",
      fraud: summary.metadataFindings?.some(f => f.type === "mismatched_hash") ? "Strong" : "Unknown",
      jurisdiction: summary.jurisdiction || "Not provided"
    };
  },


  // =============================
  // 6. RISK ENGINE
  // =============================
  computeRisk({ contradictions, metadata, behaviours }) {
    let score = 0;

    contradictions.forEach(c => (score += c.severity));
    metadata.forEach(m => (score += m.severity));
    behaviours.forEach(b => (score += b.severity));

    return Math.min(100, Math.floor(score / 10));
  },


  // =============================
  // 7. CONSENSUS ENGINE (Triple Mode)
  // =============================
  async tripleConsensus(agentCall, summary) {
    const A = await agentCall(summary);
    const B = await agentCall({ ...summary, mode: "legal" });
    const C = await agentCall({ ...summary, mode: "crosscheck" });

    if (A === B && B === C) {
      return { consensus: true, output: A };
    }

    return {
      consensus: false,
      output: {
        A, B, C,
        warning: "Models disagree — contradiction at interpretation layer."
      }
    };
  },


  // =============================
  // 8. INSTITUTIONAL ROUTING
  // =============================
  routeInstitution(level, jurisdiction) {
    const output = { route: null, notice: null };

    if (level === "bank") {
      output.route = "Fraud / Compliance Division";
      output.notice = "Institutional licence fees apply after trial period.";
    }

    if (level === "police") {
      output.route = jurisdiction === "UAE" ? "CID / Prosecution" : "SAPS Detective Branch";
    }

    if (level === "court") {
      output.route = "Clerk of Court – Affidavit Filing Desk";
    }

    return output;
  },


  // =============================
  // 9. FINAL REPORT BUILDER
  // =============================
  buildReport(analysis) {
    return {
      summary: analysis.summary,
      contradictions: analysis.contradictions,
      behavioural: analysis.behavioural,
      metadata: analysis.metadata,
      timeline: analysis.timeline,
      risk: analysis.risk,
      legal: analysis.legal,
      final: "Supportive forensic interpretation. Not legal advice."
    };
  }
};
