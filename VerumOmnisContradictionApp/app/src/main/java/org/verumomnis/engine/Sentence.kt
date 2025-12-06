package org.verumomnis.engine

/**
 * Represents a normalized sentence from evidence text.
 * 
 * @property text The sentence content
 * @property index The position/order in the original evidence
 * @property timestamp Optional extracted timestamp (epoch millis)
 */
data class Sentence(
    val text: String,
    val index: Int,
    val timestamp: Long? = null
)
