package org.verumomnis

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.verumomnis.engine.ContradictionEngine

/**
 * Unit tests for the ContradictionEngine.
 */
class ContradictionEngineTest {

    @Test
    fun testIngestSentences() {
        val engine = ContradictionEngine()
        engine.ingest("First sentence. Second sentence. Third sentence.")
        val results = engine.analyze()
        // With simple sentences, no contradictions should be found
        assertTrue(results.isEmpty())
    }

    @Test
    fun testBuildEmptyReport() {
        val engine = ContradictionEngine()
        engine.ingest("Simple test.")
        val results = engine.analyze()
        val report = engine.buildReport(results)
        assertTrue(report.contains("VERUM OMNIS"))
        assertTrue(report.contains("Contradictions Found: 0"))
    }

    @Test
    fun testDetectNegationContradiction() {
        val engine = ContradictionEngine()
        // These sentences have overlapping terms and negation difference
        engine.ingest("John went to the store yesterday. John did not go to the store yesterday.")
        val results = engine.analyze()
        // Should detect a potential contradiction
        assertTrue(results.isNotEmpty())
    }
}
