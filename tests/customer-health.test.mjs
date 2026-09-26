import test from 'node:test';
import assert from 'node:assert/strict';
import { dimensions, assessCustomerHealth, currentEvidence, syntheticExample } from '../website/health-model.mjs';

const all = value => Object.fromEntries(dimensions.map(({ key }) => [key, value]));
const ratings = data => Object.fromEntries(dimensions.map(({ key }) => [key, data[key].rating]));

test('weights total 100; unknown data cannot produce a healthy score', () => {
  assert.equal(dimensions.reduce((n, d) => n + d.weight, 0), 100);
  assert.equal(assessCustomerHealth(ratings(currentEvidence)).score, null);
  assert.equal(assessCustomerHealth({}).label, 'Not assessed');
  assert.equal(assessCustomerHealth({ ...all(2), cost: null }).score, null);
});
test('synthetic day-60 example matches documented calculation', () => {
  const result = assessCustomerHealth(ratings(syntheticExample));
  assert.equal(result.score, 57.5);
  assert.equal(result.label, 'Needs attention');
});
test('zero and boundary scores are handled, with a critical blocker override', () => {
  assert.equal(assessCustomerHealth(all(0)).label, 'At risk');
  assert.equal(assessCustomerHealth(all(1)).score, 50);
  assert.equal(assessCustomerHealth(all(1)).label, 'Needs attention');
  assert.equal(assessCustomerHealth({ ...all(2), value: 0 }).score, 80);
  assert.equal(assessCustomerHealth({ ...all(2), value: 0 }).label, 'Healthy');
  assert.equal(assessCustomerHealth(all(2), true).label, 'At risk');
  assert.equal(assessCustomerHealth({}, true).score, null);
  assert.equal(assessCustomerHealth({}, true).label, 'At risk');
});
test('rejects invalid ratings rather than coercing them', () => {
  for (const invalid of [-1, 3, '2', NaN, 0.5, false]) {
    assert.throws(() => assessCustomerHealth({ ...all(1), cost: invalid }), RangeError);
  }
});
