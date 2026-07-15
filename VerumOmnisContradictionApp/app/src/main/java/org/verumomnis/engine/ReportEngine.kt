package org.verumomnis.engine

import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * LAYER 4 — REPORT ENGINE
 * 
 * Purpose: Generate final forensic report containing:
 * 1. Pre-analysis declaration
 * 2. Narrative summary
 * 3. Contradictions list
 * 4. Legal classification
 * 5. Summary of findings
 * 6. Post-analysis declaration
 * 
 * All output is deterministic and court-safe.
 */
class ReportEngine {

    private val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US)
    private val timestampFormat = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.US)

    /**
     * Build the final forensic report.
     * 
     * Report sections appear in this exact order:
     * 1. PRE-ANALYSIS DECLARATION
     * 2. NARRATIVE STRUCTURE
     * 3. CONTRADICTIONS DETECTED
     * 4. LEGAL CLASSIFICATION
     * 5. SUMMARY FINDINGS
     * 6. POST-ANALYSIS DECLARATION
     */
    fun build(
        sentences: List<Sentence>,
        contradictions: List<ContradictionResult>,
        legal: List<LegalFinding>
    ): String {
        val report = StringBuilder()
        val generatedAt = dateFormat.format(Date())

        // ═══════════════════════════════════════════════════════════════
        // SECTION 1: PRE-ANALYSIS DECLARATION
        // ═══════════════════════════════════════════════════════════════
        report.appendLine("═══════════════════════════════════════════════════════════════════════════════")
        report.appendLine("                    VERUM OMNIS FORENSIC ANALYSIS REPORT")
        report.appendLine("═══════════════════════════════════════════════════════════════════════════════")
        report.appendLine()
        report.appendLine("Generated: $generatedAt")
        report.appendLine()
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine("                         PRE-ANALYSIS DECLARATION")
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine()
        report.appendLine("This is a deterministic forensic report. No AI interpretation included.")
        report.appendLine("All analysis is rule-based, repeatable, and legally admissible.")
        report.appendLine("Engine version: Verum Omnis v1.0")
        report.appendLine()

        // ═══════════════════════════════════════════════════════════════
        // SECTION 2: NARRATIVE STRUCTURE
        // ═══════════════════════════════════════════════════════════════
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine("                         NARRATIVE STRUCTURE")
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine()
        report.appendLine(String.format("%-6s | %-20s | %s", "Index", "Timestamp", "Sentence"))
        report.appendLine("─".repeat(80))

        for (sentence in sentences) {
            val timestamp = sentence.timestamp?.let { timestampFormat.format(Date(it)) } ?: "N/A"
            val truncatedText = if (sentence.text.length > 50) {
                sentence.text.take(47) + "..."
            } else {
                sentence.text
            }
            report.appendLine(String.format("%-6d | %-20s | %s", sentence.index, timestamp, truncatedText))
        }
        report.appendLine()
        report.appendLine("Total sentences analyzed: ${sentences.size}")
        report.appendLine()

        // ═══════════════════════════════════════════════════════════════
        // SECTION 3: CONTRADICTIONS DETECTED
        // ═══════════════════════════════════════════════════════════════
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine("                         CONTRADICTIONS DETECTED")
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine()

        if (contradictions.isEmpty()) {
            report.appendLine("No contradictions were detected in the provided evidence.")
        } else {
            contradictions.forEachIndexed { index, result ->
                report.appendLine("#${index + 1}")
                report.appendLine("  A [${result.a.index}]: \"${result.a.text}\"")
                report.appendLine("  B [${result.b.index}]: \"${result.b.text}\"")
                report.appendLine("  Reason: ${result.reason}")
                report.appendLine()
            }
        }
        report.appendLine()

        // ═══════════════════════════════════════════════════════════════
        // SECTION 4: LEGAL CLASSIFICATION
        // ═══════════════════════════════════════════════════════════════
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine("                         LEGAL CLASSIFICATION")
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine()

        if (legal.isEmpty()) {
            report.appendLine("No legal classifications triggered.")
        } else {
            for (finding in legal) {
                report.appendLine("Subject: ${formatLegalSubject(finding.subject)}")
                report.appendLine("Evidence:")
                finding.contradictions.forEachIndexed { index, contradiction ->
                    val contradictionIndex = contradictions.indexOf(contradiction) + 1
                    report.appendLine("  - Contradiction #$contradictionIndex")
                }
                report.appendLine()
            }
        }
        report.appendLine()

        // ═══════════════════════════════════════════════════════════════
        // SECTION 5: SUMMARY FINDINGS
        // ═══════════════════════════════════════════════════════════════
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine("                         SUMMARY FINDINGS")
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine()
        report.appendLine("Total contradictions: ${contradictions.size}")
        report.appendLine("Categories triggered: ${legal.size}")

        if (legal.isNotEmpty()) {
            report.appendLine("Legal subjects identified:")
            legal.forEach { finding ->
                report.appendLine("  • ${formatLegalSubject(finding.subject)} (${finding.contradictions.size} contradiction(s))")
            }
        }

        if (contradictions.isNotEmpty()) {
            // Find most severe contradiction (most legal categories)
            val classificationEngine = ClassificationEngine()
            val mostSevere = contradictions.maxByOrNull { result ->
                classificationEngine.classifySingle(result).size
            }
            if (mostSevere != null) {
                report.appendLine()
                report.appendLine("Most severe contradiction pair:")
                report.appendLine("  A: \"${mostSevere.a.text}\"")
                report.appendLine("  B: \"${mostSevere.b.text}\"")
            }
        }
        report.appendLine()

        // ═══════════════════════════════════════════════════════════════
        // SECTION 6: POST-ANALYSIS DECLARATION
        // ═══════════════════════════════════════════════════════════════
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine("                         POST-ANALYSIS DECLARATION")
        report.appendLine("───────────────────────────────────────────────────────────────────────────────")
        report.appendLine()
        report.appendLine("End of deterministic evaluation.")
        report.appendLine("This report was generated using the Verum Omnis Forensic Engine.")
        report.appendLine("All analysis follows immutable, rule-based logic.")
        report.appendLine()
        report.appendLine("═══════════════════════════════════════════════════════════════════════════════")
        report.appendLine("                         VERUM OMNIS - TRUTH PREVAILS")
        report.appendLine("═══════════════════════════════════════════════════════════════════════════════")

        return report.toString()
    }

    /**
     * Format legal subject enum to human-readable string.
     */
    private fun formatLegalSubject(subject: LegalSubject): String {
        return when (subject) {
            LegalSubject.ShareholderOppression -> "Shareholder Oppression"
            LegalSubject.BreachOfFiduciaryDuty -> "Breach of Fiduciary Duty"
            LegalSubject.Cybercrime -> "Cybercrime"
            LegalSubject.FraudulentEvidence -> "Fraudulent Evidence"
            LegalSubject.EmotionalExploitation -> "Emotional Exploitation"
        }
    }
}
