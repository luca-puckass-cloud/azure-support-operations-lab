# Incident 02 — Local access-denied response

> Local HTTP 403 simulation executed on 14 October 2026. No Azure identity, permission or role assignment was changed.

## Symptom
The local page returned HTTP 200 while /api/health returned HTTP 403. The frontend showed Degraded, Unavailable and “HTTP 403: access denied”.

## Diagnosis and boundary
HTTP 403 indicates refusal of this request; it does not by itself identify the authorization layer. The test injected the response directly in the loopback server. The live Azure API remains anonymous for its non-sensitive GET health check.

A genuine investigation would distinguish app authorization, API policy and the Azure management plane, then inspect requested action, authenticated identity and resource scope.

## Cause, resolution and verification
Cause: LAB_HEALTH_MODE=access-denied in the local preview.
Correction: use operational mode. The repeated request returned HTTP 200 and the frontend showed its labelled local simulation baseline.

## Escalation approach
Collect error, time, resource/action and scope. Hand off to the technical owner with the minimal required operation. Do not grant broad Owner access as a generic workaround.

## Evidence and repeat
[Machine-readable record](../evidence/local-exercises.json), incident-02, includes failure/recovery timestamps and frontend observations.
Run npm run exercise, or start the preview with the access-denied mode.

