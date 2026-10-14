import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createContext, runInContext } from 'node:vm';
import { once } from 'node:events';
import { createPreviewServer } from './preview-server.mjs';

// Exercise the real frontend controller against local HTTP responses.
// No production changes, real user records, credentials or Azure IAM changes.
const records = [];
const script = await readFile('website/script.js', 'utf8');
async function observe(mode) {
  const server = createPreviewServer({ healthMode: mode });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const portal = await fetch(base);
    assert.equal(portal.status, 200);
    const elements = new Map();
    const element = id => {
      if (!elements.has(id)) elements.set(id, { textContent: '', disabled: false, classList: { add() {}, remove() {} }, addEventListener() {} });
      return elements.get(id);
    };
    const context = createContext({ document: { querySelector: element }, window: { location: { protocol: 'http:' }, setTimeout, clearTimeout }, fetch: (path, options) => fetch(base + path, options), AbortController, Date });
    runInContext(script.replace(/checkServiceHealth\(\);\s*$/, ''), context);
    await runInContext('checkServiceHealth()', context);
    const api = await fetch(base + '/api/health');
    const result = { at: new Date().toISOString(), mode, portalHttp: portal.status, apiHttp: api.status, apiBody: await api.json(), uiStatus: element('#overall-status-text').textContent, uiApiState: element('#api-state').textContent, uiNote: element('#api-note').textContent };
    assert.equal(element('#refresh-status').disabled, false);
    return result;
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}

const healthy = await observe('operational');
assert.equal(healthy.apiHttp, 200);
assert.equal(healthy.uiStatus, 'Local simulation');
records.push({ id: 'baseline', ...healthy });

for (const [id, mode, expected] of [['incident-03', 'unavailable', 503], ['incident-02', 'access-denied', 403]]) {
  const failed = await observe(mode);
  assert.equal(failed.apiHttp, expected);
  assert.equal(failed.uiStatus, 'Degraded');
  assert.equal(failed.uiApiState, 'Unavailable');
  assert.match(failed.uiNote, new RegExp(String(expected)));
  const recovery = await observe('operational');
  assert.equal(recovery.apiHttp, 200);
  records.push({ id, environment: 'local injected HTTP response', failure: failed, recovery });
}

// A failed pre-deployment validation in a disposable copy, not a failed Azure deployment.
const scratch = await mkdtemp(join(tmpdir(), 'csm-validation-'));
try {
  await mkdir(join(scratch, 'website'));
  await writeFile(join(scratch, 'website/index.html'), await readFile('website/index.html'));
  await writeFile(join(scratch, 'website/script.js'), await readFile('website/script.js'));
  await writeFile(join(scratch, 'website/staticwebapp.config.json'), '{ invalid-json');
  const broken = spawnSync(process.execPath, [join(process.cwd(), 'scripts/validate-site.mjs')], { cwd: scratch, encoding: 'utf8' });
  if (broken.error) throw broken.error;
  assert.notEqual(broken.status, 0);
  assert.match(broken.stderr, /Invalid staticwebapp.config.json/);
  const failureAt = new Date().toISOString();
  const fixed = spawnSync(process.execPath, ['scripts/validate-site.mjs'], { encoding: 'utf8' });
  if (fixed.error) throw fixed.error;
  assert.equal(fixed.status, 0);
  records.push({ id: 'incident-01', environment: 'disposable local validation fixture', failureAt, failureExitCode: broken.status, symptom: 'Invalid staticwebapp.config.json (plus deliberately incomplete fixture)', recoveryAt: new Date().toISOString(), recoveryExitCode: fixed.status, recoveryOutput: fixed.stdout.trim(), limitation: 'This exercises validation; no GitHub Actions or Azure deployment was deliberately failed.' });
} finally {
  // scratch is the exact unique directory returned by mkdtemp, never the workspace.
  await rm(scratch, { recursive: true, force: true });
}
await mkdir('docs/evidence', { recursive: true });
await writeFile('docs/evidence/local-exercises.json', JSON.stringify({ verificationMethod: 'Automated local HTTP, frontend-controller and validation exercises', startedWith: healthy.at, scope: 'local exercises; no production outage or IAM change', records }, null, 2) + '\n');
console.log('PASS: local baseline, HTTP 503 recovery, HTTP 403 recovery, failed validation and valid-project recovery. Evidence: docs/evidence/local-exercises.json');
