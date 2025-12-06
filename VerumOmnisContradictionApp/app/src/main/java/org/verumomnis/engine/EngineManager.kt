package org.verumomnis.engine

/**
 * ENGINE MANAGER — Unified Pipeline Controller
 * 
 * This class orchestrates all four layers of the Verum Omnis Forensic Engine
 * in the correct immutable order:
 * 
 * 1. NarrativeEngine    - Normalize evidence into structured sentences
 * 2. ContradictionEngine - Detect conflicting statements
 * 3. ClassificationEngine - Map contradictions to legal categories
 * 4. ReportEngine        - Build final structured output
 * 
 * ENGINE IMMUTABILITY RULE:
 * The four engines must ALWAYS run in this order.
 * Logic MUST NEVER change based on evidence.
 */
class EngineManager {

    private val narrativeEngine = NarrativeEngine()
    private val contradictionEngine = ContradictionEngine()
    private val classificationEngine = ClassificationEngine()
    private val reportEngine = ReportEngine()

    // Results from each layer
    private var sentences: List<Sentence> = emptyList()
    private var contradictions: List<ContradictionResult> = emptyList()
    private var legalFindings: List<LegalFinding> = emptyList()
    private var finalReport: String = ""

    /**
     * Run the complete forensic analysis pipeline.
     * 
     * This method executes all four layers in the required order
     * and returns the final structured report.
     * 
     * @param rawEvidence The raw text evidence to analyze
     * @return The final forensic report as a string
     */
    fun analyze(rawEvidence: String): String {
        // LAYER 1 — NARRATIVE ENGINE
        narrativeEngine.ingest(rawEvidence)
        sentences = narrativeEngine.normalize()

        // LAYER 2 — CONTRADICTION ENGINE
        contradictions = contradictionEngine.analyze(sentences)

        // LAYER 3 — CLASSIFICATION ENGINE
        legalFindings = classificationEngine.classify(contradictions)

        // LAYER 4 — REPORT ENGINE
        finalReport = reportEngine.build(sentences, contradictions, legalFindings)

        return finalReport
    }

    /**
     * Get the normalized sentences from the last analysis.
     */
    fun getSentences(): List<Sentence> = sentences

    /**
     * Get the detected contradictions from the last analysis.
     */
    fun getContradictions(): List<ContradictionResult> = contradictions

    /**
     * Get the legal findings from the last analysis.
     */
    fun getLegalFindings(): List<LegalFinding> = legalFindings

    /**
     * Get the final report from the last analysis.
     */
    fun getReport(): String = finalReport

    /**
     * Get a summary of the analysis results.
     */
    fun getSummary(): AnalysisSummary {
        return AnalysisSummary(
            sentenceCount = sentences.size,
            contradictionCount = contradictions.size,
            legalCategoriesTriggered = legalFindings.size,
            categories = legalFindings.map { it.subject }
        )
    }
}

/**
 * Summary of forensic analysis results.
 */
data class AnalysisSummary(
    val sentenceCount: Int,
    val contradictionCount: Int,
    val legalCategoriesTriggered: Int,
    val categories: List<LegalSubject>
)
