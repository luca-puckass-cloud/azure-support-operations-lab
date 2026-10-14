# Customer communication · completed written role-play

> Fictional CloudShop case. These messages were drafted by Codex at Luca's request; no message was sent to a customer. The support scenario uses the actual local HTTP 503 exercise recorded on 14 October 2026; the exact UTC times of the latest run are in local-exercises.json. Message timing below is a proposed script, not evidence of communications sent.

## Initial update

“Hallo Lena, die Statusprüfung unseres Testportals liefert aktuell einen Fehler. Die Seite selbst ist erreichbar, aber die Prüf-API antwortet mit HTTP 503. Ich prüfe die betroffene Komponente und halte dich über den nächsten Schritt auf dem Laufenden. Über eure Bestellungen sagt dieser Fehler nichts aus, da sie nicht mit dem Pilot verbunden sind. Mein nächstes Update bekommst du in diesem Übungsszenario um 07:15 Uhr.”

A specific next update is useful even without a repair estimate. The 07:15 time is illustrative, not an agreed real commitment.

## Technical handoff

- Goal: support staff need a trustworthy status result and next action.
- Environment: loopback preview, explicitly simulated; live Azure remains reachable.
- Reproduce: start preview with LAB_HEALTH_MODE=unavailable; open portal and run check.
- Expected: HTTP 200 and labelled simulated baseline.
- Observed: portal HTTP 200, API HTTP 503, UI Degraded/Unavailable.
- Evidence: E05, local-exercises.json, incident-03 failure/recovery timestamps.
- Known recent change: deliberate local server fault injection.
- Confirmed cause: local preview health mode; not an unknown Azure outage.
- Resolution: restart local preview with operational mode; repeat original checks.
- Owner in role-play: technical owner for correction; CSM for follow-up.
- Workaround: page and runbooks remain accessible; do not interpret missing health as business failure.
- No tokens, private data or unrelated customer records included.

## Progress update

“Die Ursache ist im Testaufbau eingegrenzt: Die API wurde für diese Übung absichtlich auf Fehlerantworten gestellt. Ich stelle den normalen Modus wieder her und prüfe danach dieselbe Anfrage sowie die Anzeige im Portal.”

## Closure

“Die Statusprüfung im lokalen Test funktioniert wieder. Die API liefert HTTP 200 und das Portal zeigt die gekennzeichnete Simulationsantwort. Die öffentliche Azure-Demo war von der Übung nicht betroffen. Als Vorbeugung bleibt der Ablauf als wiederholbarer Test dokumentiert. Eine technische Wiederherstellung ist damit geprüft; ob eure Mitarbeitenden das Portal selbstständig nutzen können, testen wir separat.”

## Access questions and escalation

HTTP 403 alone does not prove an Azure RBAC error. Clarify whether the failure is in the public API, app login or Azure management plane. Check requested action, identity and scope before proposing a permission. Do not grant broad Owner rights just to clear an error.

## What I say when I do not know

“Ich möchte dir eine verlässliche Antwort geben. Ich halte fest, was du erreichen möchtest und was genau scheitert, und kläre die technische Voraussetzung mit dem zuständigen Team. Danach melde ich mich mit dem geprüften nächsten Schritt.”
