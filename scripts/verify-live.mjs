import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = 'https://purple-meadow-08a08f610.3.azurestaticapps.net';
const records = [];
for (const path of ['/', '/styles.css', '/script.js', '/customer-success.mjs', '/health-model.mjs', '/api/health']) {
  const response = await fetch(base + path, { signal: AbortSignal.timeout(20000), headers: { 'Cache-Control': 'no-cache' } });
  const text = await response.text();
  assert.equal(response.status, 200, path);
  const record = { at: new Date().toISOString(), path, status: response.status, contentType: response.headers.get('content-type') };
  if (path === '/') {
    assert.match(text, /Azure Customer Success Journey/);
    record.headers = Object.fromEntries(['content-security-policy', 'x-content-type-options', 'referrer-policy', 'permissions-policy'].map(key => [key, response.headers.get(key)]));
    assert.equal(record.headers['x-content-type-options'], 'nosniff');
    assert.ok(record.headers['content-security-policy']);
  }
  if (path === '/api/health') {
    record.body = JSON.parse(text);
    assert.equal(record.body.status, 'operational');
    assert.equal(record.body.service, 'azure-support-lab-api');
    assert.ok(!Number.isNaN(Date.parse(record.body.timestamp)));
  }
  records.push(record);
}
await mkdir('docs/evidence', { recursive: true });
await writeFile('docs/evidence/live-verification.json', JSON.stringify({ verificationMethod: 'Automated public HTTP checks', base, limitation: 'Point-in-time HTTP checks, not an uptime measurement or customer adoption assessment.', records }, null, 2) + '\n');
console.log('PASS: live portal, assets, security headers and API. Evidence: docs/evidence/live-verification.json');
