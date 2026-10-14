# CloudShop pilot value review · 14 October 2026

> Completed mock review. CloudShop is fictional. No real sponsor meeting, quarter, savings or customer acceptance is claimed.

## 1. What the customer wants

One place to check the pilot's technical status and find a useful next action during a problem. The business hypothesis is less avoidable support effort. This prototype does not retrieve order status or connect to a shop.

## 2. What was delivered

Portal and managed API deployed on Azure Static Web Apps Free. Live HTTP/asset/header checks passed (E02/E03). GitHub publishes main through its Azure workflow. The API reports runtime state only.

## 3. What the user can do

The functional walkthrough covered technical status, the health example and runbook/escalation paths (E07). Independent user ability has not been measured. A volunteer should repeat the acceptance tasks without help before adoption is rated.

## 4. How issues are handled

Local HTTP 503 and 403 responses produced a degraded state, and restored HTTP 200 returned the local simulation to its healthy baseline (E04/E05). Invalid local configuration was caught by validation. Written initial, handoff and closure messages complete the communication exercise (E06). These are not Azure outages; no production downtime or MTTR claim is made.

Continuous detection is absent. A manual check is useful for a pilot but may miss an issue between checks. Monitoring should be chosen only after the required detection interval and cost constraints are agreed.

## 5. Costs and benefit

Budget EUR 1/month configured. Initial October billing observation showed “No cost reported”; Actual cost and Forecast were unavailable (E08). Reporting lag remains a limitation. No final zero-cost invoice or ROI is asserted.

A reusable troubleshooting/reporting structure is delivered. Reduced ticket volume and time saved remain hypotheses until baseline and comparable measurement exist. The synthetic 57.5 score is teaching material only (E09).

## 6. Recommendation and owners

**Continue the small pilot without paid expansion.**

| Next action | Proposed owner | Exit condition |
|---|---|---|
| Independent onboarding test | Luca + volunteer | Find status, choose runbook, identify technical owner unaided |
| Recheck subscription costs | Luca | Current period visible after reporting catches up; compare with EUR 1 budget |
| Define detection need | CSM + technical owner, role-play | Agree acceptable detection delay and data required |
| Verify customer benefit | Support lead, role-play | Define baseline, follow-up period and comparable tasks before ROI |
| Consider monitoring | Technical owner | Specific detection gap and explicit cost approval |

No upsell is justified by a green endpoint alone. Current customer health remains **Not assessed**, because adoption and engagement are unknown.

## Acceptance decision

Technical pilot delivered; local troubleshooting and mock communication complete. Operational readiness demonstrated locally, not under production load. Independent customer adoption acceptance remains open.
