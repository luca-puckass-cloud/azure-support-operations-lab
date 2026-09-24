# Deployment guide

> Status: Prepared procedure. Azure deployment has not yet been performed.

## Recommended first deployment

For the first deployment, use the Azure portal because it makes the GitHub connection and generated deployment workflow visible. This is easier to audit than hiding the process behind a script.

### 1. Cost and subscription check

- Confirm the correct Azure subscription.
- Confirm that the Static Web App SKU is **Free**.
- Do not enable a paid App Service plan, database, Front Door or Microsoft Sentinel.
- Create a low budget alert before optional monitoring is enabled.

### 2. Create the Static Web App

Use these planned values:

| Setting | Value |
|---|---|
| Resource group | `rg-azure-support-lab-weu` |
| Name | Globally unique name beginning with `swa-support-lab-` |
| Plan | Free |
| Deployment source | GitHub |
| Repository | `luca-puckass-cloud/azure-support-operations-lab` |
| Branch | `main` |
| Build preset | Custom |
| App location | `/website` |
| API location | `/api` |
| Output location | leave empty |

Azure creates a deployment workflow and stores its deployment token as a GitHub Actions secret. The token must never be copied into a tracked file.

### 3. Verify the deployment

After GitHub Actions completes successfully:

1. Open the generated Azure Static Web Apps URL.
2. Confirm the portal loads over HTTPS.
3. Select **Run status check**.
4. Confirm the API changes to **Operational** and reports HTTP 200.
5. Open `/api/health` directly and confirm that the response contains only service status, version, timestamp and the runtime check.

### 4. Monitoring

Application Insights is optional and has an independent pricing model. Enable it only after confirming the subscription, budget alert and expected telemetry volume. Once enabled, verify API requests and failures in the Static Web App monitoring view.

### 5. Infrastructure as code

`infrastructure/main.bicep` is the reproducible Free-tier definition. It intentionally excludes repository credentials. Validate it before any deployment and use it only after comparing its settings with the manually created lab resource.

## Rollback

If a deployment breaks the site:

1. Identify the last successful commit in GitHub Actions.
2. Revert the faulty commit on a new branch.
3. Open and review a pull request.
4. Merge the correction and verify the generated deployment.
5. Record the incident and prevention measure.

