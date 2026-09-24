import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const websiteRoot = join(projectRoot, "website");
const port = Number.parseInt(process.env.PORT ?? "4173", 10);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
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

const server = createServer(async (request, response) => {
  if (request.url === "/api/health") {
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes[".json"]
    });
    response.end(JSON.stringify(healthPayload()));
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
    const file = await readFile(join(websiteRoot, normalizedPath));
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(normalizedPath)] ?? "application/octet-stream"
    });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Local preview: http://127.0.0.1:${port}`);
});
