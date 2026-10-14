# CloudShop onboarding record · functional walkthrough

> Functional verification, not an independent customer or learner test. CloudShop is fictional.

## Purpose

A support user should understand what the status check covers, choose a useful runbook and know whom to involve. Hosting alone does not establish that capability.

## Functional walkthrough

1. Open public portal. Browser displayed Azure Customer Success Journey; API section showed HTTP 200 and Operational (E03).
2. Separate technical health from customer health. Current health has no overall score while adoption/engagement are unknown. Local fault tests do not fill those missing customer ratings.
3. Select the synthetic day-60 example. Expected score 57.5/100, Needs attention. The example is labelled simulated and is not evidence of CloudShop use (E09).
4. Return to current evidence. No score should reappear; technical API state should stay separate.
5. Find API-unavailable runbook. Read local failure, cause, correction and recovery; the incident does not imply a shop outage.
6. Follow the escalation guidance. Give scope, exact symptom, evidence, owner and next update; technical owner corrects the issue, CSM follows up.
7. Review cost record and mock value review. Keep missing billing data visible; propose an independent acceptance test before claiming business value.

Automated checks cover the actual status controller and health-model separation. Browser verification checks displayed labels and links after publication.

## Independent acceptance test still to perform

Ask a volunteer without coaching:

| Task | Pass condition |
|---|---|
| What is currently working? | Identifies portal/API status and scope, not orders/payment |
| The API check fails. What do you do? | Selects runbook; collects error, time and affected task |
| Whom do you contact? | Identifies technical owner and CSM follow-up responsibilities |
| Does HTTP 200 mean the customer is healthy? | Explains missing adoption/engagement evidence |
| What does the current cost view prove? | Says no cost reported yet, reporting can lag |

Record participant consent, date, help required, misunderstandings and next action. Do not publish personal details. No elapsed-time or success-rate metric has been measured yet.
