@description('Globally unique name for the Azure Static Web App.')
param appName string = 'swa-support-lab-${uniqueString(resourceGroup().id)}'

@description('Azure region used for the Static Web App resource.')
param location string = 'westeurope'

@description('Tags applied to the lab resource.')
param tags object = {
  project: 'azure-support-operations-lab'
  environment: 'learning'
  managedBy: 'bicep'
  costProfile: 'free-tier'
}

resource staticWebApp 'Microsoft.Web/staticSites@2025-03-01' = {
  name: appName
  location: location
  tags: tags
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    allowConfigFileUpdates: true
    publicNetworkAccess: 'Enabled'
    stagingEnvironmentPolicy: 'Enabled'
  }
}

output staticWebAppName string = staticWebApp.name
output staticWebAppResourceId string = staticWebApp.id
output defaultHostname string = staticWebApp.properties.defaultHostname

