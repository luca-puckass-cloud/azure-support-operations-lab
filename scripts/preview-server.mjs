import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const websiteRoot = join(projectRoot, "website");
const port = Number.parseInt(process.env.PORT ?? "4173", 10);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function healthPayload() {
  return {
    status: "operational",
    service: "azure-support-lab-api",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    checks: [{ name: "local-preview", status: "operational" }]
  };
}

export function createPreviewServer({ healthMode = 'operational', websiteDirectory = websiteRoot } = {}) {
  const allowedModes = ['operational', 'unavailable', 'access-denied'];
  if (!allowedModes.includes(healthMode)) throw new Error('Unknown local exercise mode');
  return createServer(async (request, response) => {
  if (request.url === "/api/health") {
    const status = healthMode === 'unavailable' ? 503 : healthMode === 'access-denied' ? 403 : 200;
    response.writeHead(status, {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes[".json"]
    });
    response.end(JSON.stringify(status === 200 ? healthPayload() : {
      status: healthMode, simulated: true, message: 'Local exercise injection; not Azure RBAC or an Azure outage.'
    }));
    return;
  }

  const requestedPath = new URL(request.url ?? "/", "http://localhost").pathname;
  const relativePath = requestedPath === "/" ? "index.html" : requestedPath.slice(1);
  const normalizedPath = normalize(relativePath);

  if (normalizedPath.startsWith("..")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(join(websiteDirectory, normalizedPath));
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(normalizedPath)] ?? "application/octet-stream"
    });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  createPreviewServer({ healthMode: process.env.LAB_HEALTH_MODE ?? 'operational' }).listen(port, '127.0.0.1', () => {
    console.log(`Local preview: http://127.0.0.1:${port} (mode: ${process.env.LAB_HEALTH_MODE ?? 'operational'})`);
  });
}
