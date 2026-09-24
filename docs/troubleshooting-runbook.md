# Troubleshooting runbook

## Standard diagnostic sequence

1. **Confirm the symptom** — record the exact error, time, URL and affected component.
2. **Determine the scope** — one browser, one user, one region or the entire service.
3. **Check recent change** — review the latest commit and GitHub Actions deployment.
4. **Check service health** — test the portal and `/api/health` separately.
5. **Check access** — verify identity, role assignment and resource scope.
6. **Inspect evidence** — use workflow logs and, when enabled, Application Insights.
7. **Apply the smallest safe correction** — avoid unrelated changes during an incident.
8. **Verify recovery** — repeat the original failing action.
9. **Communicate** — state impact, current status and next update clearly.
10. **Prevent recurrence** — add a test, validation rule or documentation update.

## Portal unavailable

| Check | Expected evidence |
|---|---|
| Browser and URL | Correct HTTPS hostname and reproducible symptom |
| GitHub Actions | Latest deployment completed successfully |
| Static Web App | Resource reports healthy state |
| Static assets | `index.html`, `styles.css` and `script.js` return successfully |
| Configuration | Navigation fallback excludes static assets and `/api/*` |

## API unavailable

| Check | Expected evidence |
|---|---|
| Endpoint | `/api/health` returns HTTP 200 |
| Workflow | `api_location` points to `/api` |
| Runtime | `staticwebapp.config.json` specifies a supported Node runtime |
| Function discovery | `api/package.json` points to `src/functions/*.js` |
| Logs | Request or startup error is visible after monitoring is enabled |

## Access denied

- Confirm the signed-in identity.
- Confirm the affected Azure subscription and tenant.
- Check the role assignment at the correct scope.
- Allow time for a new role assignment to propagate.
- Do not solve authorization problems by assigning Owner or broad permanent access without justification.

## Customer-facing update template

> We have confirmed an issue affecting [component]. The impact is [scope]. We are currently checking [evidence/source]. The next update will follow after [next diagnostic step]. No customer action is required at this time.

