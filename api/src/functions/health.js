const { app } = require("@azure/functions");

const SERVICE_VERSION = "1.0.0";

function createHealthResponse(timestamp = new Date()) {
  return {
    status: "operational",
    service: "azure-support-lab-api",
    version: SERVICE_VERSION,
    timestamp: timestamp.toISOString(),
    checks: [
      {
        name: "function-runtime",
        status: "operational"
      }
    ]
  };
}

app.http("health", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "health",
  handler: async (request, context) => {
    context.log("Health check completed", {
      invocationId: context.invocationId,
      method: request.method
    });

    return {
      status: 200,
      jsonBody: createHealthResponse(),
      headers: {
        "Cache-Control": "no-store"
      }
    };
  }
});

module.exports = { createHealthResponse };

