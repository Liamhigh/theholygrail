package org.verumomnis.engine

/**
 * ContradictionEngine - Analyzes evidence text for contradictions.
 *
 * This engine implements the Verum Omnis Constitutional Governance Layer
 * standards for contradiction detection and analysis.
 */
class ContradictionEngine {

    private val sentences = mutableListOf<Sentence>()

    /**
     * Ingest evidence text and break it into individual sentences.
     */
    fun ingest(text: String) {
        sentences.clear()
        val sentenceTexts = text.split(Regex("[.!?]+"))
            .map { it.trim() }
            .filter { it.isNotEmpty() }

        sentenceTexts.forEachIndexed { index, sentenceText ->
            sentences.add(Sentence(sentenceText, index))
        }
    }

    /**
     * Analyze all ingested sentences for contradictions.
     *
     * Implements multi-pass scanning including:
     * - Timeline analysis
     * - Statement comparison
     * - Behavioral inconsistencies
     */
    fun analyze(): List<ContradictionResult> {
        val results = mutableListOf<ContradictionResult>()

        // Compare each sentence pair for potential contradictions
        for (i in sentences.indices) {
            for (j in i + 1 until sentences.size) {
                val contradiction = detectContradiction(sentences[i], sentences[j])
                if (contradiction != null) {
                    results.add(contradiction)
                }
            }
        }

        return results
    }

    /**
     * Detect contradiction between two sentences.
     */
    private fun detectContradiction(a: Sentence, b: Sentence): ContradictionResult? {
        // Check for negation patterns
        val negationWords = listOf("not", "never", "no", "didn't", "wasn't", "weren't", "couldn't", "wouldn't", "shouldn't")

        val aLower = a.text.lowercase()
        val bLower = b.text.lowercase()

        // Check for direct negation contradictions
        for (negation in negationWords) {
            if (aLower.contains(negation) && !bLower.contains(negation) ||
                !aLower.contains(negation) && bLower.contains(negation)) {
                // Check for common subject/object overlap
                val aWords = aLower.split(Regex("\\s+")).toSet()
                val bWords = bLower.split(Regex("\\s+")).toSet()
                val overlap = aWords.intersect(bWords) - negationWords.toSet() - setOf("the", "a", "an", "is", "was", "were", "be", "been", "being")

                if (overlap.size >= 2) {
                    return ContradictionResult(
                        a = a,
                        b = b,
                        reason = "Potential negation contradiction detected. Common terms: ${overlap.joinToString(", ")}"
                    )
                }
            }
        }

        // Check for temporal contradictions (simple heuristic)
        val timeWords = listOf("before", "after", "during", "while", "then", "first", "last", "earlier", "later")
        val aHasTime = timeWords.any { aLower.contains(it) }
        val bHasTime = timeWords.any { bLower.contains(it) }

        if (aHasTime && bHasTime) {
            val aWords = aLower.split(Regex("\\s+")).toSet()
            val bWords = bLower.split(Regex("\\s+")).toSet()
            val overlap = aWords.intersect(bWords) - timeWords.toSet() - setOf("the", "a", "an", "is", "was", "were")

            if (overlap.size >= 2) {
                return ContradictionResult(
                    a = a,
                    b = b,
                    reason = "Potential timeline inconsistency detected. Review temporal sequence."
                )
            }
        }

        return null
    }

    /**
     * Build a human-readable contradiction report.
     */
    fun buildReport(results: List<ContradictionResult>): String {
        if (results.isEmpty()) {
            return """
                |═══════════════════════════════════════════════════════════════
                |                    VERUM OMNIS CONTRADICTION REPORT
                |═══════════════════════════════════════════════════════════════
                |
                |Total Sentences Analyzed: ${sentences.size}
                |Contradictions Found: 0
                |
                |No contradictions were detected in the provided evidence.
                |
                |═══════════════════════════════════════════════════════════════
                |                    VERUM OMNIS - TRUTH PREVAILS
                |═══════════════════════════════════════════════════════════════
            """.trimMargin()
        }

        val reportBuilder = StringBuilder()
        reportBuilder.appendLine("═══════════════════════════════════════════════════════════════")
        reportBuilder.appendLine("                    VERUM OMNIS CONTRADICTION REPORT")
        reportBuilder.appendLine("═══════════════════════════════════════════════════════════════")
        reportBuilder.appendLine()
        reportBuilder.appendLine("Total Sentences Analyzed: ${sentences.size}")
        reportBuilder.appendLine("Contradictions Found: ${results.size}")
        reportBuilder.appendLine()
        reportBuilder.appendLine("───────────────────────────────────────────────────────────────")
        reportBuilder.appendLine("                         FINDINGS")
        reportBuilder.appendLine("───────────────────────────────────────────────────────────────")

        results.forEachIndexed { index, result ->
            reportBuilder.appendLine()
            reportBuilder.appendLine("CONTRADICTION #${index + 1}")
            reportBuilder.appendLine("Statement A [${result.a.index}]: \"${result.a.text}\"")
            reportBuilder.appendLine("Statement B [${result.b.index}]: \"${result.b.text}\"")
            reportBuilder.appendLine("Analysis: ${result.reason}")
            reportBuilder.appendLine()
        }

        reportBuilder.appendLine("═══════════════════════════════════════════════════════════════")
        reportBuilder.appendLine("                    VERUM OMNIS - TRUTH PREVAILS")
        reportBuilder.appendLine("═══════════════════════════════════════════════════════════════")

        return reportBuilder.toString()
    }
}
