# Customer communication and escalation

> Training templates only. No message sent, no real customer case and no agreed response-time commitment.

## Exercise: unavailable status endpoint

Use [Incident 03](../incidents/incident-03-unavailable-api.md) after deployment. Gather evidence before claiming a cause. Break only this lab deliberately, never a real service.

### Initial customer update (German)

"Die Statusanzeige kann ihren Prüfendpunkt aktuell nicht erreichen. Ich prüfe, ob die Ursache im Deployment oder in der API liegt. Daraus lässt sich noch nicht ableiten, ob andere Dienste betroffen sind. Ich melde mich zum vereinbarten nächsten Update-Zeitpunkt mit dem aktuellen Stand."

Record observed impact and agree a specific next-update time in the role-play. An update deadline is not a repair promise.

### Technical handoff

- Customer goal and affected task:
- Environment and first observation (UTC):
- Reproduction steps; actual vs expected result:
- HTTP status / error / redacted logs:
- Recent change, if known:
- Checks completed and results:
- Workaround and limitations:
- Technical owner and specific question:
- Communication owner and next update:

Never forward credentials or unrelated data. The CSM owns follow-up; the specialist owns technical diagnosis.

### When you do not know

"Ich möchte Ihnen eine verlässliche Antwort geben. Dafür kläre ich die technische Voraussetzung mit unserem zuständigen Team. Habe ich richtig verstanden, dass Sie [Ziel] unter [Anforderung] erreichen möchten? Ich halte die Frage und den nächsten Rückmeldetermin fest."

### Closure (fill after exercise)

Record verified cause, actual correction, recovery check, remaining limitations, acceptance if obtained and prevention owner. One successful request does not prove permanent availability; a self-test does not establish customer acceptance.

## Proactive follow-up

After repeated access questions, propose a short enablement session and checklist. Check whether the user can complete the task afterwards. Escalating a ticket alone does not establish adoption.
