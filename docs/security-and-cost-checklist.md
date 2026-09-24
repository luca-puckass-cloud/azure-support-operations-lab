# Security and cost checklist

## Before deployment

- [ ] Correct Azure subscription and tenant selected.
- [ ] Resource group name and region reviewed.
- [ ] Azure Static Web Apps **Free** SKU selected.
- [ ] No virtual machine, paid App Service plan or database included.
- [ ] Repository contains no passwords, API keys, deployment tokens or personal data.
- [ ] GitHub account uses two-factor authentication and a private commit email.
- [ ] `.gitignore` excludes local settings and environment files.

## After deployment

- [ ] HTTPS URL works.
- [ ] `/api/health` returns only non-sensitive operational data.
- [ ] GitHub Actions secret exists but its value is never displayed or copied.
- [ ] Security headers are present.
- [ ] Cost Analysis shows the expected amount.
- [ ] A low budget notification is configured before enabling paid telemetry.
- [ ] Unused test resources are removed after an exercise.

## Optional monitoring decision

Application Insights is useful for requests, failures and traces, but it has an independent pricing model. Enable it only when the learning value justifies the additional resource and after cost alerts are configured.

## Prohibited repository content

- Azure deployment tokens
- Personal access tokens
- `local.settings.json`
- Real customer names, messages or ticket content
- Employer-internal screenshots or documentation
- Personal address, phone number or private email address

