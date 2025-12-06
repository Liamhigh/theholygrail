package org.verumomnis

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.verumomnis.engine.*

/**
 * Unit tests for the Verum Omnis Forensic Engine.
 * Tests all four layers: Narrative, Contradiction, Classification, and Report.
 */
class EngineTest {

    // ═══════════════════════════════════════════════════════════════
    // LAYER 1 — NARRATIVE ENGINE TESTS
    // ═══════════════════════════════════════════════════════════════

    @Test
    fun testNarrativeEngineTokenization() {
        val engine = NarrativeEngine()
        engine.ingest("First sentence. Second sentence. Third sentence.")
        val sentences = engine.normalize()
        
        assertEquals(3, sentences.size)
        assertEquals("First sentence", sentences[0].text)
        assertEquals(0, sentences[0].index)
    }

    @Test
    fun testNarrativeEngineTimestampExtraction() {
        val engine = NarrativeEngine()
        val timestamp = engine.extractTimestamp("Meeting on 2024-03-15 was cancelled")
        
        assertTrue(timestamp != null)
    }

    @Test
    fun testNarrativeEngineNoTimestamp() {
        val engine = NarrativeEngine()
        val timestamp = engine.extractTimestamp("Just a simple sentence with no date")
        
        assertTrue(timestamp == null)
    }

    // ═══════════════════════════════════════════════════════════════
    // LAYER 2 — CONTRADICTION ENGINE TESTS
    // ═══════════════════════════════════════════════════════════════

    @Test
    fun testContradictionEngineNoContradictions() {
        val engine = ContradictionEngine()
        val sentences = listOf(
            Sentence("The sky is blue", 0),
            Sentence("Grass is green", 1),
            Sentence("Water is wet", 2)
        )
        val results = engine.analyze(sentences)
        
        assertTrue(results.isEmpty())
    }

    @Test
    fun testRule1DirectNegation() {
        val engine = ContradictionEngine()
        val sentences = listOf(
            Sentence("John went to the store yesterday", 0),
            Sentence("John did not go to the store yesterday", 1)
        )
        val results = engine.analyze(sentences)
        
        assertTrue(results.isNotEmpty())
        assertTrue(results[0].reason.contains("RULE 1"))
    }

    @Test
    fun testRule2DenialVsEvidence() {
        val engine = ContradictionEngine()
        val sentences = listOf(
            Sentence("There was no payment made", 0),
            Sentence("The payment was received on Tuesday", 1)
        )
        val results = engine.analyze(sentences)
        
        assertTrue(results.isNotEmpty())
        assertTrue(results.any { it.reason.contains("RULE 2") || it.reason.contains("Denial") })
    }

    @Test
    fun testRule7DataAccessConflict() {
        val engine = ContradictionEngine()
        val sentences = listOf(
            Sentence("I did not access the system", 0),
            Sentence("I accessed the system to check records", 1)
        )
        val results = engine.analyze(sentences)
        
        assertTrue(results.isNotEmpty())
        assertTrue(results.any { it.reason.contains("RULE 7") || it.reason.contains("Access") })
    }

    // ═══════════════════════════════════════════════════════════════
    // LAYER 3 — CLASSIFICATION ENGINE TESTS
    // ═══════════════════════════════════════════════════════════════

    @Test
    fun testClassificationEngineCybercrime() {
        val engine = ClassificationEngine()
        val contradiction = ContradictionResult(
            a = Sentence("I did not access the database", 0),
            b = Sentence("I logged into the database server", 1),
            reason = "Data access conflict"
        )
        
        val findings = engine.classify(listOf(contradiction))
        
        assertTrue(findings.any { it.subject == LegalSubject.Cybercrime })
    }

    @Test
    fun testClassificationEngineShareholderOppression() {
        val engine = ClassificationEngine()
        val contradiction = ContradictionResult(
            a = Sentence("The profit was shared equally", 0),
            b = Sentence("I never received any profit share", 1),
            reason = "Conflicting statements about business"
        )
        
        val findings = engine.classify(listOf(contradiction))
        
        assertTrue(findings.any { it.subject == LegalSubject.ShareholderOppression })
    }

    @Test
    fun testClassificationEngineNoMatch() {
        val engine = ClassificationEngine()
        val contradiction = ContradictionResult(
            a = Sentence("The cat sat on the mat", 0),
            b = Sentence("The cat did not sit on the mat", 1),
            reason = "Simple negation"
        )
        
        val findings = engine.classify(listOf(contradiction))
        
        assertTrue(findings.isEmpty())
    }

    // ═══════════════════════════════════════════════════════════════
    // LAYER 4 — REPORT ENGINE TESTS
    // ═══════════════════════════════════════════════════════════════

    @Test
    fun testReportEngineEmptyReport() {
        val engine = ReportEngine()
        val report = engine.build(
            sentences = emptyList(),
            contradictions = emptyList(),
            legal = emptyList()
        )
        
        assertTrue(report.contains("VERUM OMNIS"))
        assertTrue(report.contains("PRE-ANALYSIS DECLARATION"))
        assertTrue(report.contains("POST-ANALYSIS DECLARATION"))
        assertTrue(report.contains("deterministic"))
    }

    @Test
    fun testReportEngineWithContradictions() {
        val engine = ReportEngine()
        val sentences = listOf(
            Sentence("Statement A text", 0),
            Sentence("Statement B text", 1)
        )
        val contradictions = listOf(
            ContradictionResult(
                a = sentences[0],
                b = sentences[1],
                reason = "Test contradiction"
            )
        )
        
        val report = engine.build(
            sentences = sentences,
            contradictions = contradictions,
            legal = emptyList()
        )
        
        assertTrue(report.contains("CONTRADICTIONS DETECTED"))
        assertTrue(report.contains("Statement A text"))
        assertTrue(report.contains("Statement B text"))
        assertTrue(report.contains("Total contradictions: 1"))
    }

    // ═══════════════════════════════════════════════════════════════
    // ENGINE MANAGER — INTEGRATION TESTS
    // ═══════════════════════════════════════════════════════════════

    @Test
    fun testEngineManagerFullPipeline() {
        val manager = EngineManager()
        val evidence = "I never met John. I met John on Monday. The payment was made. No payment was received."
        
        val report = manager.analyze(evidence)
        
        // Verify all sections are present
        assertTrue(report.contains("VERUM OMNIS FORENSIC ANALYSIS REPORT"))
        assertTrue(report.contains("PRE-ANALYSIS DECLARATION"))
        assertTrue(report.contains("NARRATIVE STRUCTURE"))
        assertTrue(report.contains("CONTRADICTIONS DETECTED"))
        assertTrue(report.contains("LEGAL CLASSIFICATION"))
        assertTrue(report.contains("SUMMARY FINDINGS"))
        assertTrue(report.contains("POST-ANALYSIS DECLARATION"))
        
        // Verify contradictions were detected
        assertTrue(manager.getContradictions().isNotEmpty())
    }

    @Test
    fun testEngineManagerSummary() {
        val manager = EngineManager()
        manager.analyze("I agreed to the terms. I never agreed to the terms.")
        
        val summary = manager.getSummary()
        
        assertEquals(2, summary.sentenceCount)
        assertTrue(summary.contradictionCount > 0)
    }
}
