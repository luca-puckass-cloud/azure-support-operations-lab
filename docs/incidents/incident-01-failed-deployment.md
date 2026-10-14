# Incident 01 — Failed pre-deployment validation

> Executed locally on 14 October 2026. Not a failed Azure or GitHub deployment.

## Symptom and scope
The repository validator exited with code 1 and reported invalid staticwebapp.config.json. Only a disposable local fixture was affected; live Azure stayed reachable.

## Diagnosis
The fixture deliberately contains invalid JSON and is incomplete. Its missing-file errors are expected setup artefacts, not findings in the real project. The test asserts the invalid-configuration error separately.

## Cause and resolution
Cause: the fixture's JSON syntax was deliberately broken. Recovery is checked against the full, valid working copy; the validator exits with code 0. The damaged fixture is removed after the exercise.

This proves the validator rejects a malformed configuration. It does not establish a cloud deployment failure or corrective production commit.

## Prevention
Run validation and tests before deployment. The Azure publishing workflow now runs repository validation, site/API tests and local exercises before upload.

## Evidence and repeat
[Machine-readable record](../evidence/local-exercises.json), incident-01; actual timestamps are stored there.
Run npm run exercise. No production outage or credential change is involved.

