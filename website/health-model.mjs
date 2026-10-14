export const dimensions = Object.freeze([
  { key: 'adoption', label: 'Adoption', weight: 30 },
  { key: 'support', label: 'Support', weight: 25 },
  { key: 'engagement', label: 'Engagement', weight: 15 },
  { key: 'value', label: 'Value', weight: 20 },
  { key: 'cost', label: 'Cost', weight: 10 }
].map(Object.freeze));

export function assessCustomerHealth(ratings = {}, criticalBlocker = false) {
  let score = 0;
  const missing = [];
  for (const { key, weight } of dimensions) {
    const rating = ratings[key];
    if (rating === null || rating === undefined) {
      missing.push(key);
    } else if (!Number.isInteger(rating) || rating < 0 || rating > 2) {
      throw new RangeError(`Invalid rating for ${key}: use 0, 1, 2 or null`);
    } else {
      score += weight * rating / 2;
    }
  }
  if (missing.length) return { score: null, label: criticalBlocker ? 'At risk' : 'Not assessed', missing, criticalBlocker };
  const label = criticalBlocker || score < 50 ? 'At risk' : score < 80 ? 'Needs attention' : 'Healthy';
  return { score, label, missing, criticalBlocker };
}

export const currentEvidence = {
  adoption: { rating: null, evidence: 'Functional walkthrough completed; independent learner test pending.', action: 'Ask a volunteer to find status, runbook and escalation unaided.' },
  support: { rating: 1, evidence: 'Local HTTP 503/403 recovery exercises; no continuous detection.', action: 'Review detection needs before selecting monitoring.' },
  engagement: { rating: null, evidence: 'Fictional customer; no sponsor meeting.', action: 'Use the role-play review script; do not invent engagement.' },
  value: { rating: 1, evidence: 'Live portal/API verified; customer benefit unmeasured.', action: 'Test independent use and establish a baseline before claiming savings.' },
  cost: { rating: 1, evidence: 'No cost reported at initial review; reporting may lag.', action: 'Repeat the subscription cost review after data arrives.' }
};

export const syntheticExample = {
  adoption: { rating: 1, evidence: 'Needs help selecting a runbook.', action: 'Guided practice, then repeat the task.' },
  support: { rating: 1, evidence: 'Recurring access question; workaround available.', action: 'Technical handoff and access checklist.' },
  engagement: { rating: 2, evidence: 'Accountable sponsor attended a review.', action: 'Keep owner; agree next checkpoint.' },
  value: { rating: 1, evidence: 'Access verified; independent use not demonstrated.', action: 'Test the remaining success criterion.' },
  cost: { rating: 1, evidence: 'Cost view does not cover the full review period.', action: 'Review complete data before expansion.' }
};
