import { dimensions, assessCustomerHealth, currentEvidence, syntheticExample } from './health-model.mjs';

const projectButton = document.querySelector('#show-project');
const exampleButton = document.querySelector('#show-example');
const rows = document.querySelector('#customer-health-rows');

function showAssessment(isExample) {
  const data = isExample ? syntheticExample : currentEvidence;
  const ratings = Object.fromEntries(dimensions.map(({ key }) => [key, data[key].rating]));
  const result = assessCustomerHealth(ratings);
  projectButton.setAttribute('aria-pressed', String(!isExample));
  exampleButton.setAttribute('aria-pressed', String(isExample));
  const label = document.querySelector('#customer-health-label');
  label.textContent = result.label;
  label.className = `state ${result.score === null ? 'state-planned' : 'state-degraded'}`;
  document.querySelector('#customer-health-score').textContent = result.score === null ? 'No score yet' : `${result.score} / 100`;
  document.querySelector('#customer-health-context').textContent = isExample
    ? 'SIMULATED DAY 60: invented observations for learning, not measured customer outcomes. Prioritise enablement before expansion.'
    : 'Customer evidence has not been collected. Missing data is unknown, not healthy.';
  rows.replaceChildren();
  for (const { key, label, weight } of dimensions) {
    const row = document.createElement('tr');
    const heading = document.createElement('th');
    heading.scope = 'row';
    heading.textContent = `${label} / ${weight}%`;
    const evidence = document.createElement('td');
    evidence.textContent = `${data[key].rating === null ? '' : `${data[key].rating}/2 - `}${data[key].evidence}`;
    const action = document.createElement('td');
    action.textContent = data[key].action;
    row.append(heading, evidence, action);
    rows.append(row);
  }
}

projectButton.addEventListener('click', () => showAssessment(false));
exampleButton.addEventListener('click', () => showAssessment(true));
showAssessment(false);
