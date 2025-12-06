package org.verumomnis.engine

/**
 * LAYER 3 — CLASSIFICATION ENGINE
 * 
 * Purpose: Map contradictions to legal subject categories defined in Verum Omnis.
 * 
 * This engine applies deterministic rules to classify detected contradictions
 * into specific legal frameworks. Each contradiction may map to multiple categories.
 */
class ClassificationEngine {

    // RULE A — Corporate / Business Conflicts → ShareholderOppression
    private val shareholderOppressionKeywords = listOf(
        "profit", "agreement", "deal", "decision", "responsibility", "ownership",
        "shareholder", "dividend", "equity", "investment", "business", "company",
        "board", "director", "vote", "control", "stake", "shares"
    )

    // RULE B — Evidence Tampering → FraudulentEvidence
    private val fraudulentEvidenceKeywords = listOf(
        "delete", "removed", "cropped", "missing", "screenshot", "edited",
        "altered", "tampered", "fabricated", "forged", "doctored", "modified",
        "manipulated", "changed", "erased", "destroyed", "hidden"
    )

    // RULE C — Device / Account Access → Cybercrime
    private val cybercrimeKeywords = listOf(
        "access", "login", "password", "device", "breach", "unauthorized",
        "hacked", "account", "system", "database", "server", "network",
        "computer", "phone", "email", "credentials", "security"
    )

    // RULE D — Trust / Duty Conflicts → BreachOfFiduciaryDuty
    private val fiduciaryDutyKeywords = listOf(
        "managing", "accounting", "decision-making", "duty", "lied",
        "trust", "fiduciary", "obligation", "responsibility", "authority",
        "power", "position", "management", "oversight", "governance"
    )

    // RULE E — Manipulation / Denial → EmotionalExploitation
    private val emotionalExploitationKeywords = listOf(
        "gaslight", "you said", "you did", "never happened", "emotional",
        "manipulation", "abuse", "control", "threaten", "intimidate",
        "coerce", "exploit", "pressure", "guilt", "blame", "victim"
    )

    /**
     * Classify a list of contradiction results into legal findings.
     * Each contradiction may map to more than one legal category.
     */
    fun classify(results: List<ContradictionResult>): List<LegalFinding> {
        val findingsMap = mutableMapOf<LegalSubject, MutableList<ContradictionResult>>()

        for (result in results) {
            val combinedText = "${result.a.text} ${result.b.text} ${result.reason}".lowercase()
            
            // RULE A — ShareholderOppression
            if (shareholderOppressionKeywords.any { combinedText.contains(it) }) {
                findingsMap.getOrPut(LegalSubject.ShareholderOppression) { mutableListOf() }.add(result)
            }

            // RULE B — FraudulentEvidence
            if (fraudulentEvidenceKeywords.any { combinedText.contains(it) }) {
                findingsMap.getOrPut(LegalSubject.FraudulentEvidence) { mutableListOf() }.add(result)
            }

            // RULE C — Cybercrime
            if (cybercrimeKeywords.any { combinedText.contains(it) }) {
                findingsMap.getOrPut(LegalSubject.Cybercrime) { mutableListOf() }.add(result)
            }

            // RULE D — BreachOfFiduciaryDuty
            if (fiduciaryDutyKeywords.any { combinedText.contains(it) }) {
                findingsMap.getOrPut(LegalSubject.BreachOfFiduciaryDuty) { mutableListOf() }.add(result)
            }

            // RULE E — EmotionalExploitation
            if (emotionalExploitationKeywords.any { combinedText.contains(it) }) {
                findingsMap.getOrPut(LegalSubject.EmotionalExploitation) { mutableListOf() }.add(result)
            }
        }

        // Convert map to list of LegalFindings
        return findingsMap.map { (subject, contradictions) ->
            LegalFinding(subject, contradictions.toList())
        }.sortedBy { it.subject.name }
    }

    /**
     * Get all legal subjects that a single contradiction maps to.
     */
    fun classifySingle(result: ContradictionResult): List<LegalSubject> {
        val subjects = mutableListOf<LegalSubject>()
        val combinedText = "${result.a.text} ${result.b.text} ${result.reason}".lowercase()

        if (shareholderOppressionKeywords.any { combinedText.contains(it) }) {
            subjects.add(LegalSubject.ShareholderOppression)
        }
        if (fraudulentEvidenceKeywords.any { combinedText.contains(it) }) {
            subjects.add(LegalSubject.FraudulentEvidence)
        }
        if (cybercrimeKeywords.any { combinedText.contains(it) }) {
            subjects.add(LegalSubject.Cybercrime)
        }
        if (fiduciaryDutyKeywords.any { combinedText.contains(it) }) {
            subjects.add(LegalSubject.BreachOfFiduciaryDuty)
        }
        if (emotionalExploitationKeywords.any { combinedText.contains(it) }) {
            subjects.add(LegalSubject.EmotionalExploitation)
        }

        return subjects
    }
}
