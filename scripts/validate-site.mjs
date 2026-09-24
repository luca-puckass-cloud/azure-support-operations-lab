import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "README.md",
  "website/index.html",
  "website/styles.css",
  "website/script.js",
  "website/staticwebapp.config.json",
  "api/host.json",
  "api/package.json",
  "api/src/functions/health.js",
  "infrastructure/main.bicep",
  "docs/architecture.md",
  "docs/deployment-guide.md",
  "docs/troubleshooting-runbook.md",
  "docs/security-and-cost-checklist.md"
];

const errors = [];

for (const relativePath of requiredFiles) {
  try {
    await access(path.join(root, relativePath), constants.R_OK);
  } catch {
    errors.push(`Missing required file: ${relativePath}`);
  }
}

const html = await readFile(path.join(root, "website/index.html"), "utf8");
const script = await readFile(path.join(root, "website/script.js"), "utf8");
const configText = await readFile(
  path.join(root, "website/staticwebapp.config.json"),
  "utf8"
);

for (const id of [
  "refresh-status",
  "last-updated",
  "overall-status",
  "api-state",
  "api-note"
]) {
  if (!html.includes(`id="${id}"`)) {
    errors.push(`Missing required HTML id: ${id}`);
  }
}

if (!script.includes('fetch("/api/health"')) {
  errors.push("Frontend does not call the /api/health endpoint.");
}

try {
  JSON.parse(configText);
} catch (error) {
  errors.push(`Invalid staticwebapp.config.json: ${error.message}`);
}

if (errors.length > 0) {
  console.error("Validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validation passed: ${requiredFiles.length} required files checked.`);

