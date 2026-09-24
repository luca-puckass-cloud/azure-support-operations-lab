# Infrastructure

`main.bicep` defines a single Azure Static Web App using the Free SKU. It does not create a virtual machine, database, paid App Service plan or Microsoft Sentinel workspace.

The template intentionally does not contain a GitHub token or deployment secret. Repository access and the deployment secret must be configured through Azure and GitHub instead of being committed to source control.

## Validation

When Azure CLI and Bicep are available, validate the template before deployment:

```bash
az deployment group validate \
  --resource-group rg-azure-support-lab-weu \
  --template-file infrastructure/main.bicep
```

Deployment is deliberately deferred until the subscription, selected region and Free SKU have been checked in the Azure portal.

