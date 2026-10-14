# Evidence register · 14 October 2026

Every statement distinguishes real Azure observations, local tests and fictional customer material.

| ID | Claim | State | Evidence |
|---|---|---|---|
| E01 | Portal implementation | Tested locally and served publicly | Site tests and [HTTP verification](../evidence/live-verification.json) |
| E02 | Azure deployment | Cloud verified | Luca completed portal creation; generated GitHub workflow; public URL verified |
| E03 | Live endpoint | Cloud verified, point-in-time | [HTTP response and UTC timestamps](../evidence/live-verification.json); operational runtime, HTTP 200 |
| E04 | Access-denied handling | Local HTTP 403 simulation only | [Exercise record](../evidence/local-exercises.json); no Azure IAM role change or real RBAC resolution |
| E05 | Failure and recovery | Locally executed | HTTP 503/403, controller state, valid recovery and failed validation in [records](../evidence/local-exercises.json) |
| E06 | Customer updates | Completed written role-play | [Initial update, handoff, closure](customer-communications.md); never sent |
| E07 | Onboarding | Assistant walkthrough | [Onboarding record](onboarding-record.md); independent learner acceptance remains open |
| E08 | Cost review | Initial Azure billing observation | [Cost record](../evidence/cost-review.md); no cost reported, not a final invoice |
| E09 | Day-60 health | Synthetic | [57.5/100 example](health-model.md); invented customer observations |
| E10 | Value review | Completed mock review | [Review](value-review.md), with evidence references and unknowns |

## Attribution

Luca: selected requirements, completed guided Azure subscription/budget/resource/GitHub connection, opened and tested live pages.

Codex: code and docs, isolated working copy, automated HTTP/controller/validation tests, browser checks and written mock customer messages. No claim that Luca independently diagnosed these injected faults.

## What the evidence does not establish

Real customer adoption or satisfaction, completed 90-day history, production SLA, quantified support reduction, independent Azure administration or an Azure access-permission incident.

## Publication boundaries

No secrets, subscription identifiers, tenant identifiers, personal billing screenshots, private email or real customer data are published. Evidence contains only the public demo URL, safe HTTP output, local test observations and redacted textual billing observations.

## Accurate interview introduction

“I deployed a small portal and managed API to Azure Static Web Apps Free with guidance. I used AI to help build the implementation and repeatable local troubleshooting exercises. I connected the lab to a fictional customer success case: goals, onboarding, communication, health assessment and a value review. The deployment is real; customer outcomes are simulated or still unmeasured.”
