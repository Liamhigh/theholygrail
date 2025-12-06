package org.verumomnis.engine

/**
 * Represents a legal finding with associated contradictions.
 * 
 * @property subject The legal category this finding relates to
 * @property contradictions The list of contradictions supporting this finding
 */
data class LegalFinding(
    val subject: LegalSubject,
    val contradictions: List<ContradictionResult>
)
