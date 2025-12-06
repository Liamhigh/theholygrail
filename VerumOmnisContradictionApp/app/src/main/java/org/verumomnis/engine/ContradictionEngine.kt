package org.verumomnis.engine

/**
 * LAYER 2 — CONTRADICTION ENGINE
 * 
 * Purpose: Detect contradictions between any two sentences.
 * 
 * This engine implements all 7 deterministic contradiction detection rules
 * as defined in the Verum Omnis specification. All logic is rule-based,
 * deterministic, and court-safe.
 */
class ContradictionEngine {

    // Common words to exclude from overlap analysis
    private val stopWords = setOf(
        "the", "a", "an", "is", "was", "were", "be", "been", "being",
        "i", "he", "she", "it", "they", "we", "you", "and", "or", "but",
        "in", "on", "at", "to", "for", "of", "with", "that", "this"
    )

    // RULE 1 - Direct Negation words
    private val negationWords = listOf(
        "never", "not", "no", "didn't", "did not", "wasn't", "was not",
        "weren't", "were not", "couldn't", "could not", "wouldn't", "would not",
        "shouldn't", "should not", "haven't", "have not", "hasn't", "has not",
        "don't", "do not", "doesn't", "does not", "cannot", "can't"
    )

    // RULE 3 - Timeline/temporal words
    private val timelineWords = listOf(
        "before", "after", "during", "while", "then", "first", "last",
        "earlier", "later", "monday", "tuesday", "wednesday", "thursday",
        "friday", "saturday", "sunday", "january", "february", "march",
        "april", "may", "june", "july", "august", "september", "october",
        "november", "december"
    )

    // RULE 3 - Event topic words for timeline conflicts
    private val eventTopics = listOf(
        "met", "meeting", "invoice", "payment", "call", "email", "sent",
        "received", "agreed", "signed", "delivered", "submitted"
    )

    // RULE 4 - Number words for quantity conflicts
    private val numberWords = listOf(
        "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "once", "twice", "single", "multiple", "several",
        "many", "few", "none", "first", "second", "third"
    )

    // RULE 5 - Admission/agreement words
    private val admissionWords = listOf(
        "agreed", "admitted", "confirmed", "acknowledged", "accepted",
        "consented", "approved", "authorized", "said yes", "i did"
    )

    // RULE 6 - Action words
    private val actionWords = listOf(
        "sent", "delivered", "provided", "gave", "submitted", "attached",
        "included", "shared", "transferred", "paid"
    )

    // RULE 7 - Data access words
    private val accessWords = listOf(
        "access", "accessed", "login", "logged", "password", "device",
        "breach", "unauthorized", "account", "system", "database", "file"
    )

    /**
     * Analyze a list of sentences for contradictions.
     * Implements all 7 contradiction detection rules.
     */
    fun analyze(sentences: List<Sentence>): List<ContradictionResult> {
        val results = mutableListOf<ContradictionResult>()

        // Compare each sentence pair for potential contradictions
        for (i in sentences.indices) {
            for (j in i + 1 until sentences.size) {
                val contradiction = contradictionRule(sentences[i], sentences[j])
                if (contradiction != null) {
                    results.add(contradiction)
                }
            }
        }

        return results
    }

    /**
     * Apply all contradiction rules to a pair of sentences.
     * Returns the first matching contradiction or null.
     */
    fun contradictionRule(a: Sentence, b: Sentence): ContradictionResult? {
        val aLower = a.text.lowercase()
        val bLower = b.text.lowercase()
        val aWords = aLower.split(Regex("\\s+")).toSet()
        val bWords = bLower.split(Regex("\\s+")).toSet()
        val overlap = aWords.intersect(bWords) - stopWords

        // RULE 1 — Direct Negation
        val rule1 = checkDirectNegation(a, b, aLower, bLower, overlap)
        if (rule1 != null) return rule1

        // RULE 2 — Denial vs Evidence
        val rule2 = checkDenialVsEvidence(a, b, aLower, bLower, overlap)
        if (rule2 != null) return rule2

        // RULE 3 — Timeline Conflicts
        val rule3 = checkTimelineConflict(a, b, aLower, bLower, overlap)
        if (rule3 != null) return rule3

        // RULE 4 — Quantity Conflicts
        val rule4 = checkQuantityConflict(a, b, aLower, bLower, overlap)
        if (rule4 != null) return rule4

        // RULE 5 — Admission vs Later Denial
        val rule5 = checkAdmissionVsDenial(a, b, aLower, bLower, overlap)
        if (rule5 != null) return rule5

        // RULE 6 — Action vs Outcome Conflict
        val rule6 = checkActionVsOutcome(a, b, aLower, bLower, overlap)
        if (rule6 != null) return rule6

        // RULE 7 — Data Access Claim Conflicts
        val rule7 = checkDataAccessConflict(a, b, aLower, bLower, overlap)
        if (rule7 != null) return rule7

        return null
    }

    /**
     * RULE 1 — Direct Negation
     * If one sentence contains negation while the other affirms the same event.
     */
    private fun checkDirectNegation(
        a: Sentence, b: Sentence,
        aLower: String, bLower: String,
        overlap: Set<String>
    ): ContradictionResult? {
        val aHasNegation = negationWords.any { aLower.contains(it) }
        val bHasNegation = negationWords.any { bLower.contains(it) }

        if (aHasNegation != bHasNegation && overlap.size >= 2) {
            return ContradictionResult(
                a = a,
                b = b,
                reason = "RULE 1 - Direct Negation: One statement negates what the other affirms. Common terms: ${overlap.take(5).joinToString(", ")}"
            )
        }
        return null
    }

    /**
     * RULE 2 — Denial vs Evidence
     * E.g., "no payment" vs "payment made"
     */
    private fun checkDenialVsEvidence(
        a: Sentence, b: Sentence,
        aLower: String, bLower: String,
        overlap: Set<String>
    ): ContradictionResult? {
        val denialPatterns = listOf(
            "no payment" to "payment",
            "never met" to "met",
            "did not receive" to "received",
            "no email" to "email",
            "no invoice" to "invoice",
            "never agreed" to "agreed",
            "no contract" to "contract"
        )

        for ((denial, evidence) in denialPatterns) {
            val aDenies = aLower.contains(denial)
            val bDenies = bLower.contains(denial)
            val aHasEvidence = aLower.contains(evidence) && !aLower.contains("no $evidence") && !aLower.contains("never $evidence")
            val bHasEvidence = bLower.contains(evidence) && !bLower.contains("no $evidence") && !bLower.contains("never $evidence")

            if ((aDenies && bHasEvidence) || (bDenies && aHasEvidence)) {
                return ContradictionResult(
                    a = a,
                    b = b,
                    reason = "RULE 2 - Denial vs Evidence: One statement denies what the other provides evidence for. Pattern: '$denial' vs '$evidence'"
                )
            }
        }
        return null
    }

    /**
     * RULE 3 — Timeline Conflicts
     * Different months/dates for the same event topic.
     */
    private fun checkTimelineConflict(
        a: Sentence, b: Sentence,
        aLower: String, bLower: String,
        overlap: Set<String>
    ): ContradictionResult? {
        val aHasTime = timelineWords.any { aLower.contains(it) }
        val bHasTime = timelineWords.any { bLower.contains(it) }
        val hasEventOverlap = eventTopics.any { topic ->
            aLower.contains(topic) && bLower.contains(topic)
        }

        if (aHasTime && bHasTime && hasEventOverlap) {
            // Check if different time references for same event
            val aTimeRef = timelineWords.filter { aLower.contains(it) }
            val bTimeRef = timelineWords.filter { bLower.contains(it) }
            
            if (aTimeRef.toSet() != bTimeRef.toSet()) {
                return ContradictionResult(
                    a = a,
                    b = b,
                    reason = "RULE 3 - Timeline Conflict: Different temporal references for the same event. A: ${aTimeRef.joinToString()}, B: ${bTimeRef.joinToString()}"
                )
            }
        }
        return null
    }

    /**
     * RULE 4 — Quantity Conflicts
     * Different numbers for the same subject.
     */
    private fun checkQuantityConflict(
        a: Sentence, b: Sentence,
        aLower: String, bLower: String,
        overlap: Set<String>
    ): ContradictionResult? {
        val aNumbers = numberWords.filter { aLower.contains(it) }
        val bNumbers = numberWords.filter { bLower.contains(it) }

        // Also check for digit numbers
        val aDigits = Regex("\\d+").findAll(aLower).map { it.value }.toList()
        val bDigits = Regex("\\d+").findAll(bLower).map { it.value }.toList()

        val hasQuantityDifference = (aNumbers.isNotEmpty() && bNumbers.isNotEmpty() && aNumbers.toSet() != bNumbers.toSet()) ||
                (aDigits.isNotEmpty() && bDigits.isNotEmpty() && aDigits.toSet() != bDigits.toSet())

        if (hasQuantityDifference && overlap.size >= 2) {
            return ContradictionResult(
                a = a,
                b = b,
                reason = "RULE 4 - Quantity Conflict: Different quantities stated for similar subject. Common terms: ${overlap.take(5).joinToString(", ")}"
            )
        }
        return null
    }

    /**
     * RULE 5 — Admission vs Later Denial
     * E.g., "I agreed" vs "I never agreed"
     */
    private fun checkAdmissionVsDenial(
        a: Sentence, b: Sentence,
        aLower: String, bLower: String,
        overlap: Set<String>
    ): ContradictionResult? {
        for (admission in admissionWords) {
            val aAdmits = aLower.contains(admission) && !negationWords.any { aLower.contains("$it $admission") || aLower.contains("$it$admission") }
            val bAdmits = bLower.contains(admission) && !negationWords.any { bLower.contains("$it $admission") || bLower.contains("$it$admission") }
            val aDenies = aLower.contains(admission) && negationWords.any { aLower.contains(it) }
            val bDenies = bLower.contains(admission) && negationWords.any { bLower.contains(it) }

            if ((aAdmits && bDenies) || (bAdmits && aDenies)) {
                return ContradictionResult(
                    a = a,
                    b = b,
                    reason = "RULE 5 - Admission vs Denial: One statement admits '$admission' while the other denies it."
                )
            }
        }
        return null
    }

    /**
     * RULE 6 — Action vs Outcome Conflict
     * E.g., "I sent nothing" vs "email attached"
     */
    private fun checkActionVsOutcome(
        a: Sentence, b: Sentence,
        aLower: String, bLower: String,
        overlap: Set<String>
    ): ContradictionResult? {
        for (action in actionWords) {
            val aDeniesAction = aLower.contains(action) && (aLower.contains("nothing") || aLower.contains("never") || aLower.contains("did not"))
            val bDeniesAction = bLower.contains(action) && (bLower.contains("nothing") || bLower.contains("never") || bLower.contains("did not"))
            val aConfirmsAction = aLower.contains(action) && !aDeniesAction
            val bConfirmsAction = bLower.contains(action) && !bDeniesAction

            if ((aDeniesAction && bConfirmsAction) || (bDeniesAction && aConfirmsAction)) {
                return ContradictionResult(
                    a = a,
                    b = b,
                    reason = "RULE 6 - Action vs Outcome Conflict: Conflicting claims about action '$action'."
                )
            }
        }
        return null
    }

    /**
     * RULE 7 — Data Access Claim Conflicts
     * E.g., "I did not access" vs evidence of access attempt
     */
    private fun checkDataAccessConflict(
        a: Sentence, b: Sentence,
        aLower: String, bLower: String,
        overlap: Set<String>
    ): ContradictionResult? {
        val aHasAccess = accessWords.any { aLower.contains(it) }
        val bHasAccess = accessWords.any { bLower.contains(it) }

        if (aHasAccess && bHasAccess) {
            val aDeniesAccess = negationWords.any { aLower.contains(it) }
            val bDeniesAccess = negationWords.any { bLower.contains(it) }

            if (aDeniesAccess != bDeniesAccess) {
                return ContradictionResult(
                    a = a,
                    b = b,
                    reason = "RULE 7 - Data Access Conflict: Conflicting claims about data/system access."
                )
            }
        }
        return null
    }
}
