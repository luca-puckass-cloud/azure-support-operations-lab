# Incident 03 — Local unavailable API and recovery

> Executed locally on 14 October 2026 using a local injected HTTP 503. The public Azure demo was not interrupted.

## Impact and detection
The local portal remained reachable (HTTP 200), but its status API returned HTTP 503. The real frontend controller displayed Degraded / Unavailable and “HTTP 503: API check failed”. This blocks the pilot status check, not any real shop, payment or order.

## Diagnosis
Test portal and API separately. The frontend is working; the failing component is the local API response. The recent deliberate change is the preview-server health mode. Because the fault was injected, its cause is known; do not pretend it was discovered through Azure logs.

## Root cause and correction
The preview server was started in unavailable mode. Replace it with operational mode and repeat the same checks. API HTTP 200 and the labelled local simulation baseline were restored.

## Customer communication
[Completed written role-play](../customer-success/customer-communications.md) includes initial update, technical handoff, progress and closure. No message was sent. A check failure does not justify saying the customer's shop is down.

## Prevention and remaining limitation
Keep the local regression test: errors must be visible, buttons re-enabled, portal still readable and recovery detected. Show HTTP status in the interface so a support handoff has a useful symptom.
Continuous cloud detection is not configured; the current live check is manual.

## Evidence
[Exercise record](../evidence/local-exercises.json), incident-03, contains actual UTC timestamps, status codes and UI text. Execution is automated and fast; no human support resolution-time improvement is claimed.

## Repeat
Run npm run exercise. For a visible browser demonstration use LAB_HEALTH_MODE=unavailable with npm run preview; then restart in operational mode and reload.

