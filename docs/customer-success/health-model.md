# Customer health - transparent learning model

> Practice model, not a validated churn predictor. Independent of `/api/health`.

Five dimensions receive 0, 1 or 2. A missing rating means **unknown**, not zero or healthy. If any dimension is unknown, overall health is **Not assessed**, with no numeric score.

| Dimension | Weight | 0 | 1 | 2 |
|---|---:|---|---|---|
| Adoption | 30% | Agreed key task blocked | Needs assistance | Agreed task completed independently |
| Support | 25% | Material unresolved blocker | Workaround / recurring open issue | No material blockers in review scope |
| Engagement | 15% | No accountable contact after agreed follow-up | Owner identified; review pending | Review completed with accountable owner |
| Value | 20% | Evidence shows goal unmet | Outcome partly evidenced | Agreed criteria evidenced and reviewed |
| Cost | 10% | Observed spend exceeds guardrail | Evidence incomplete or delayed | Observed spend reviewed against guardrail |

Complete ratings: `score = sum(weight * rating / 2)` (0-100).

- 80-100: **Healthy**
- 50 to below 80: **Needs attention**
- Below 50: **At risk**
- An explicitly recorded critical blocker overrides the label to **At risk**. Numeric score, if available, remains visible; unknown dimensions still prevent a numeric score.

Thresholds are chosen for this exercise, not an industry standard. Interpret evidence and customer context before acting.

## Current assessment

All dimensions unknown; overall **Not assessed**. Preparing code and documents does not establish customer adoption, engagement or value. Azure deployment is pending.

## Synthetic day-60 portal example

| Dimension | Rating | Invented observation | Action |
|---|---:|---|---|
| Adoption | 1 | User needs help selecting a runbook | Guided practice, then repeat task |
| Support | 1 | Recurring access question has a workaround | Technical handoff and access checklist |
| Engagement | 2 | Accountable sponsor attended review | Keep owner; agree next checkpoint |
| Value | 1 | Portal access verified, independent use not demonstrated | Test remaining criterion |
| Cost | 1 | Cost view does not cover full review period | Review complete data before expansion |

`15 + 12.5 + 15 + 10 + 5 = 57.5/100`: **Needs attention**. No critical blocker is set in this example.

These observations are synthetic teaching material. No customer meeting, usage or satisfaction result is claimed. Selecting the example never changes technical API state or the evidence register.
