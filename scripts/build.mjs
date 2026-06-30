import { spawnSync } from "node:child_process";
import { cleanCache } from "./clean-cache.mjs";
import { killPorts } from "./kill-ports.mjs";

console.log("Preparing a clean production build...\n");

// Never build while old dev servers are still holding stale chunks.
killPorts();
cleanCache();

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
