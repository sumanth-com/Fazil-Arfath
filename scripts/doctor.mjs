import { spawnSync } from "node:child_process";
import { cleanCache } from "./clean-cache.mjs";
import { killPorts } from "./kill-ports.mjs";

console.log("Running project doctor...\n");

killPorts();
cleanCache();

console.log("\nVerifying production build...\n");

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

if (result.status === 0) {
  console.log("\nDoctor check passed. Run: npm run dev");
} else {
  console.error("\nDoctor check failed.");
}

process.exit(result.status ?? 1);
