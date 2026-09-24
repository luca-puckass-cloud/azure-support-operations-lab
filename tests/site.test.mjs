import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

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

