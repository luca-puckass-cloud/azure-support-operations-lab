# Security and cost checklist

## Before deployment

- [x] Correct Azure subscription and tenant selected.
- [x] Actual resource group and region documented; naming label is not a region guarantee.
- [x] Azure Static Web Apps **Free** SKU selected.
- [x] No virtual machine, paid App Service plan or database included.
- [x] Published project files contain no credentials or private customer data; workflow contains a secret reference only.
- [ ] GitHub account uses two-factor authentication and a private commit email.
- [ ] `.gitignore` excludes local settings and environment files.

## After deployment

- [x] HTTPS URL works.
- [x] `/api/health` returns only non-sensitive operational data.
- [ ] GitHub Actions secret exists but its value is never displayed or copied.
- [x] Security headers are present in live HTTP responses.
- [ ] Cost Analysis reporting is complete (initial view: no cost reported; values unavailable).
- [x] EUR 1 subscription budget created; no paid telemetry enabled. Recipient/threshold not reverified in completion.
- [x] No extra cloud test resources created; disposable local fixture removed.

## Optional monitoring decision

Application Insights is useful for requests, failures and traces, but it has an independent pricing model. Enable it only when the learning value justifies the additional resource and after cost alerts are configured.

## Prohibited repository content

- Azure deployment tokens
- Personal access tokens
- `local.settings.json`
- Real customer names, messages or ticket content
- Employer-internal screenshots or documentation
- Personal address, phone number or private email address

