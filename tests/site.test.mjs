import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("customer journey retains explicit evidence boundaries and separate health controls", async () => {
  const html = await readFile("website/index.html", "utf8");
  const controller = await readFile("website/customer-success.mjs", "utf8");
  assert.match(html, /Azure Customer Success Journey/);
  for (const id of ['customer', 'journey', 'customer-health', 'show-example', 'show-project']) {
    assert.ok(html.includes(`id="${id}"`));
  }
  assert.match(html, /Azure deployment and live exercises are pending/);
  assert.match(html, /type="module" src="customer-success.mjs"/);
  assert.match(controller, /SIMULATED DAY 60/);
  assert.doesNotMatch(controller, /fetch\(|localStorage|#overall-status|#api-state/);
});

test("site links its local assets and API integration", async () => {
  const html = await readFile("website/index.html", "utf8");
  const script = await readFile("website/script.js", "utf8");

  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="script\.js"/);
  assert.match(html, /id="refresh-status"/);
  assert.match(script, /fetch\("\/api\/health"/);
});

test("static web app configuration includes security headers", async () => {
  const config = JSON.parse(
    await readFile("website/staticwebapp.config.json", "utf8")
  );

  assert.equal(config.platform.apiRuntime, "node:20");
  assert.ok(config.globalHeaders["Content-Security-Policy"]);
  assert.equal(config.globalHeaders["X-Content-Type-Options"], "nosniff");
});

