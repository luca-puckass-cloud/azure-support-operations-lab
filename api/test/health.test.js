const test = require("node:test");
const assert = require("node:assert/strict");
const { createHealthResponse } = require("../src/functions/health");

test("health response contains stable service information", () => {
  const timestamp = new Date("2026-09-24T12:00:00.000Z");
  const result = createHealthResponse(timestamp);

  assert.equal(result.status, "operational");
  assert.equal(result.service, "azure-support-lab-api");
  assert.equal(result.version, "1.0.0");
  assert.equal(result.timestamp, timestamp.toISOString());
  assert.deepEqual(result.checks, [
    {
      name: "function-runtime",
      status: "operational"
    }
  ]);
});

