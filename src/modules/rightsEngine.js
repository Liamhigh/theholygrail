/*
  MODULE 10 – Verum Omnis Rights & Jurisdiction Engine
  ----------------------------------------------------
  Input:
    - summaryJSON   (offline analysis result)
    - jurisdiction  ("SA", "UAE", "EU")

  Output:
    - clear procedural rights
    - obligations of authorities
    - what normally happens next
    - evidence rules
    - anti-retaliation protections
*/

export function rightsEngine(summary, jurisdiction) {
  const base = {
    evidence_rules: [
      "User controls all evidence.",
      "Only summaries and hashes are processed.",
      "Raw files remain on the device.",
      "Authorities must accept metadata-based integrity explanations."
    ],
    disclaimers: [
      "This is procedural guidance, not legal representation.",
      "Interpretations are based on forensic summary signals."
    ],
    victim_protection: [
      "Do not confront alleged offenders.",
      "Do not reveal analysis results to suspects.",
      "Escalation should be done through safe channels only."
    ]
  };

  const J = jurisdiction?.toUpperCase();

  if (!J) {
    return {
      error: "Jurisdiction missing.",
      message: "Provide SA, UAE, or EU to generate rights mapping."
    };
  }

  switch (J) {
    case "SA": return rightsSA(summary, base);
    case "UAE": return rightsUAE(summary, base);
    case "EU": return rightsEU(summary, base);
    default:
      return {
        error: "Unsupported jurisdiction",
        message: "Supported: SA, UAE, EU"
      };
  }
}


/* ------------------------- SOUTH AFRICA ------------------------- */

function rightsSA(summary, base) {
  return {
    jurisdiction: "South Africa",
    constitutional_rights: [
      "Right to equality and dignity.",
      "Right not to be unfairly discriminated against.",
      "Right to be protected from violence (direct or indirect).",
      "Right to fair policing and non-retaliation.",
      "Right to access courts and lodge charges without obstruction."
    ],
    police_procedure: [
      "SAPS must open a case when evidence of fraud or harm exists.",
      "A protection order can be requested under the Domestic Violence Act or Harassment Act.",
      "Metadata-backed evidence is admissible.",
      "Police may not dismiss cases simply because evidence is digital."
    ],
    fraud_pathway: [
      "Fraud is a criminal offence.",
      "Statements, contradictions, and metadata findings are relevant.",
      "Timeline inconsistencies can support intent."
    ],
    retaliation_protection: [
      "False counter-charges are illegal.",
      "Retaliatory protection orders can be challenged.",
      "User may request investigation into misuse of legal process."
    ],
    ...base
  };
}


/* ------------------------- UNITED ARAB EMIRATES ------------------------- */

function rightsUAE(summary, base) {
  return {
    jurisdiction: "United Arab Emirates",
    constitutional_rights: [
      "Right to safety and non-retaliation.",
      "Right to file a criminal complaint with Dubai Police or Public Prosecution.",
      "Right to have digital evidence accepted with certification.",
      "Right to civil compensation through UAE courts."
    ],
    police_procedure: [
      "Fraud is a criminal offence under Federal Decree-Law 31/2021.",
      "False documents create immediate criminal liability.",
      "Authorities accept metadata-based forensic reports.",
      "Public Prosecution may request digital forensics."
    ],
    fraud_pathway: [
      "Forgery, use of forged documents, and misuse of signatures apply.",
      "Timeline contradictions assist intent determination.",
      "Metadata anomalies support tampering claims."
    ],
    retaliation_protection: [
      "Misuse of legal procedures is punishable.",
      "Retaliatory complaints can backfire legally.",
      "Both civil and criminal actions can be run in parallel."
    ],
    ...base
  };
}


/* ------------------------- EUROPEAN UNION ------------------------- */

function rightsEU(summary, base) {
  return {
    jurisdiction: "European Union",
    constitutional_rights: [
      "Right to safety, dignity, and data privacy (GDPR).",
      "Right to fair legal process.",
      "Right to protection from harassment or fraud.",
      "Right to access consumer and civil remedies."
    ],
    police_procedure: [
      "Police must register complaints involving fraud.",
      "Digital evidence and metadata must be acknowledged under EU regulations.",
      "User can escalate through national ombudsman and EU consumer agencies."
    ],
    fraud_pathway: [
      "Fraud triggers civil and criminal consequences.",
      "Misrepresentation and document inconsistency matter.",
      "Metadata and timeline signals support claims."
    ],
    retaliation_protection: [
      "Harassment protections under EU directives apply.",
      "Retaliatory or abusive complaints can be sanctioned.",
      "User can seek fast civil injunctions."
    ],
    ...base
  };
}

