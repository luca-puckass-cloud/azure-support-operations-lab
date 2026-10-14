# Learning notes

## What I should be able to explain

- GitHub stores the version history and triggers automated checks.
- Azure Static Web Apps hosts the static portal and a managed HTTP API.
- The browser calls `/api/health`; success and failure states are displayed differently.
- GitHub Actions validates pushed code before the Azure publishing step. Branch protection was not configured, so checks do not by themselves prevent a direct push to `main`.
- Bicep describes the Azure resource consistently without storing credentials.
- Application Insights can provide request, failure and trace evidence after it is enabled.
- RBAC grants permissions to an identity at a defined Azure scope.

## Honest description of AI assistance

> I defined the requirements and completed the guided Azure setup. AI assisted with code, automated validation, local failure exercises and documentation. My next learning step is repeating and explaining the local tests independently. Continuous monitoring is not enabled.

## Interview summary

> This lab is a small support portal deployed with Azure Static Web Apps. It includes a managed health API, GitHub validation, security headers, a Free-tier Bicep definition and operational documentation. I use it to practise the complete support lifecycle: verifying a symptom, checking deployments and permissions, inspecting monitoring evidence, restoring service and documenting prevention measures.

