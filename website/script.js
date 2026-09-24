const refreshButton = document.querySelector("#refresh-status");
const lastUpdatedText = document.querySelector("#last-updated");
const overallStatus = document.querySelector("#overall-status");
const overallStatusText = document.querySelector("#overall-status-text");
const apiState = document.querySelector("#api-state");
const apiNote = document.querySelector("#api-note");

const STATUS_CLASSES = ["is-degraded", "is-unavailable"];
const API_STATE_CLASSES = [
  "state-operational",
  "state-planned",
  "state-degraded",
  "state-unavailable"
];

function formatTimestamp(value = new Date()) {
  return value.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium"
  });
}

function setOverallStatus(label, modifierClass = "") {
  overallStatus.classList.remove(...STATUS_CLASSES);

  if (modifierClass) {
    overallStatus.classList.add(modifierClass);
  }

  overallStatusText.textContent = label;
}

function setApiStatus(label, note, stateClass) {
  apiState.classList.remove(...API_STATE_CLASSES);
  apiState.classList.add(stateClass);
  apiState.textContent = label;
  apiNote.textContent = note;
}

function showLocalPreview() {
  setOverallStatus("Local preview");
  setApiStatus("Not running locally", "Deploy or use SWA CLI", "state-planned");
  lastUpdatedText.textContent = formatTimestamp();
}

async function checkServiceHealth() {
  refreshButton.disabled = true;
  refreshButton.textContent = "Checking…";

  if (window.location.protocol === "file:") {
    showLocalPreview();
    refreshButton.disabled = false;
    refreshButton.textContent = "Run status check";
    return;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("/api/health", {
      cache: "no-store",
      headers: { "Accept": "application/json" },
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Health endpoint returned HTTP ${response.status}`);
    }

    const result = await response.json();
    const checkedAt = result.timestamp ? new Date(result.timestamp) : new Date();

    setOverallStatus("Operational");
    setApiStatus("Operational", `HTTP ${response.status}`, "state-operational");
    lastUpdatedText.textContent = formatTimestamp(checkedAt);
  } catch (error) {
    const timedOut = error.name === "AbortError";

    setOverallStatus("Degraded", "is-degraded");
    setApiStatus(
      "Unavailable",
      timedOut ? "Request timed out" : "API check failed",
      "state-unavailable"
    );
    lastUpdatedText.textContent = formatTimestamp();
  } finally {
    window.clearTimeout(timeout);
    refreshButton.disabled = false;
    refreshButton.textContent = "Run status check";
  }
}

refreshButton.addEventListener("click", checkServiceHealth);

checkServiceHealth();
