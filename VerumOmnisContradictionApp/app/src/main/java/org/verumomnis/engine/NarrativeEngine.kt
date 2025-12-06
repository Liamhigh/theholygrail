package org.verumomnis.engine

import java.text.SimpleDateFormat
import java.util.Locale
import java.util.regex.Pattern

/**
 * LAYER 1 — NARRATIVE ENGINE
 * 
 * Purpose: Convert raw text evidence into clean, indexed, timestamp-aware sentences.
 * 
 * This layer normalizes evidence into structured, ordered sentences that can be
 * analyzed by subsequent layers. All operations are deterministic and rule-based.
 */
class NarrativeEngine {

    private val rawSentences = mutableListOf<String>()
    private val sentences = mutableListOf<Sentence>()

    // Date patterns for timestamp extraction
    private val datePatterns = listOf(
        Pattern.compile("\\d{4}-\\d{2}-\\d{2}"),           // YYYY-MM-DD
        Pattern.compile("\\d{2}/\\d{2}/\\d{4}"),           // DD/MM/YYYY
        Pattern.compile("\\d{2}-\\d{2}-\\d{4}"),           // DD-MM-YYYY
        Pattern.compile("\\d{1,2}:\\d{2}(:\\d{2})?"),      // HH:MM or HH:MM:SS
        Pattern.compile("\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}") // ISO format
    )

    private val dateFormats = listOf(
        SimpleDateFormat("yyyy-MM-dd", Locale.US),
        SimpleDateFormat("dd/MM/yyyy", Locale.US),
        SimpleDateFormat("dd-MM-yyyy", Locale.US),
        SimpleDateFormat("yyyy-MM-dd'T'HH:mm", Locale.US)
    )

    /**
     * Ingest raw text evidence for processing.
     */
    fun ingest(rawText: String) {
        rawSentences.clear()
        sentences.clear()
        rawSentences.addAll(tokenize(rawText))
    }

    /**
     * Split raw text into sentences using punctuation rules.
     */
    private fun tokenize(rawText: String): List<String> {
        return rawText
            .split(Regex("[.!?]+"))
            .map { it.trim() }
            .filter { it.isNotEmpty() }
    }

    /**
     * Extract timestamp from a sentence if present.
     * Returns epoch milliseconds or null if no timestamp found.
     */
    fun extractTimestamp(sentence: String): Long? {
        for (pattern in datePatterns) {
            val matcher = pattern.matcher(sentence)
            if (matcher.find()) {
                val dateStr = matcher.group()
                for (format in dateFormats) {
                    try {
                        val date = format.parse(dateStr)
                        if (date != null) {
                            return date.time
                        }
                    } catch (e: Exception) {
                        // Try next format
                    }
                }
            }
        }
        return null
    }

    /**
     * Normalize all ingested sentences into structured Sentence objects.
     * Preserves order, extracts timestamps, and cleans whitespace.
     */
    fun normalize(): List<Sentence> {
        sentences.clear()
        rawSentences.forEachIndexed { index, text ->
            val cleanedText = text
                .replace(Regex("\\s+"), " ")  // Normalize whitespace
                .trim()
            
            val timestamp = extractTimestamp(cleanedText)
            sentences.add(Sentence(cleanedText, index, timestamp))
        }
        return sentences.toList()
    }

    /**
     * Get the normalized sentences.
     */
    fun getSentences(): List<Sentence> = sentences.toList()

    /**
     * Get the count of processed sentences.
     */
    fun getSentenceCount(): Int = sentences.size
}
