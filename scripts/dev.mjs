import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { cleanCache } from "./clean-cache.mjs";
import { killPorts } from "./kill-ports.mjs";

const PORT = process.env.PORT || "3000";

console.log("Preparing a clean dev server...\n");

killPorts();
cleanCache();

// Give Windows a moment to release file locks on .next
await sleep(350);

const useTurbo = process.env.NEXT_DISABLE_TURBO !== "1";
const args = ["next", "dev", "-p", PORT];

if (useTurbo) {
  args.push("--turbo");
  console.log("Using Turbopack for dev (more stable on Windows).\n");
}

const child = spawn("npx", args, {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
