/*
  Verum Omnis – Module 7
  Threat & Retaliation Firewall
  Offline + Stateless
*/

export function analyseThreat(summaryText) {
  const text = summaryText.toLowerCase();

  let score = 0;
  let indicators = [];

  const threats = [
    { pattern: /kill|hurt|stab|shoot|dead/, score: 40, label: "Direct violent threat" },
    { pattern: /come for you|wait for you|you'll see/, score: 25, label: "Implied physical threat" },
    { pattern: /i'll make you pay|ruin you|destroy your life/, score: 20, label: "Retaliation threat" },
    { pattern: /take your kids|take everything/, score: 20, label: "Family/security threat" },
    { pattern: /police|court|case.*drop it/, score: 10, label: "Legal intimidation" },
    { pattern: /stop talking|keep quiet|shut up/, score: 10, label: "Coercive control" },
    { pattern: /i know where you live|watching you/, score: 30, label: "Stalking indicators" },
    { pattern: /dont.*tell|never tell anyone/, score: 20, label: "Secrecy coercion" }
  ];

  threats.forEach(t => {
    if (t.pattern.test(text)) {
      score += t.score;
      indicators.push(t.label);
    }
  });

  // Behavioural weighting
  if (/angry|rage|screaming|shouting/.test(text)) {
    score += 10;
    indicators.push("Aggressive behaviour");
  }

  if (/lie|lying|manipulating|gaslight/.test(text)) {
    score += 5;
    indicators.push("Manipulation / gaslighting");
  }

  // Cap score
  score = Math.min(score, 100);

  let severity;
  if (score >= 75) severity = "CRITICAL";
  else if (score >= 50) severity = "HIGH";
  else if (score >= 25) severity = "MODERATE";
  else severity = "LOW";

  return {
    severity,
    score,
    indicators
  };
}
