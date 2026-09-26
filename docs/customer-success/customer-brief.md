# CloudShop - discovery brief

> Fictional training customer. Company details are scenario assumptions, not a real engagement or facts about an employer.

## Situation and scope

CloudShop is a small e-commerce business whose support team relies on scattered instructions and repeated status questions. The pilot provides one shared information and service-status portal on Azure. The storefront, orders, payment systems and customer records stay outside the pilot.

Reducing support contacts is a hypothesis, not a promised or measured result.

| Role | Responsibility | Discovery question |
|---|---|---|
| Business sponsor | Outcome, scope and cost approval | Which support problem matters most, and why? |
| Support lead | Onboarding and operating procedure | What information is missing during an incident? |
| Pilot users | Try the portal and report blockers | Can you find status and the right next step unaided? |
| Technical owner | Deployment, access and recovery | Who can change the environment and verify recovery? |
| CSM (Luca, role-play) | Goals, enablement, risks and follow-up | What prevents the customer from getting value? |

Luca may perform several roles in the lab, but a role-play is not independent customer validation.

## Three proposed success criteria

1. **Technical readiness:** Portal and health endpoint reachable after deployment. Record URL, UTC time, HTTP response and deployment result. This is a point-in-time check, not an uptime SLA.
2. **Operational readiness:** Complete one controlled incident from detection to verified recovery, with an initial customer update, escalation summary and closure message. Use actual timestamps; do not invent a resolution-time improvement.
3. **Adoption readiness:** A learner explains service status, chooses the relevant runbook and identifies the escalation owner. Label a self-walkthrough honestly; independent testing stays pending until a real volunteer completes it.

## Constraints and open decisions

- Synthetic content only; no orders, payments, personal data or secrets.
- Start with the existing small Static Web Apps design. Review suitability and limitations before deployment.
- No promised high availability, compliance certification or production SLA.
- Learning-budget proposal: EUR 0 for the initial Free-SKU pilot; paid additions need Luca's separate approval. Verify eligibility and billing before claiming zero cost.
- Confirm subscription, region and access owner in the guided Azure session.
- Decide how to collect costs and usage. An empty or delayed cost view does not prove there were no charges.

## Luca's discovery exercise

Explain in your own words: the customer problem beyond hosting, what is inside/outside scope, what would make you pause expansion, and which question requires technical confirmation. Do not mark this exercise completed before doing it.
