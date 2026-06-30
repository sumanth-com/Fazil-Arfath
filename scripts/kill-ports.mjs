import { execSync } from "node:child_process";

const DEFAULT_PORTS = [3000, 3001, 3002, 3003, 3004, 3005];

export function killPorts(ports = DEFAULT_PORTS) {
  for (const port of ports) {
    killPort(port);
  }
}

function killPort(port) {
  if (process.platform === "win32") {
    try {
      const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });

      const pids = new Set(
        output
          .split(/\r?\n/)
          .map((line) => line.trim().split(/\s+/).at(-1))
          .filter(Boolean)
      );

      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
          console.log(`Stopped process ${pid} on port ${port}`);
        } catch {
          // Process may already be gone.
        }
      }
    } catch {
      // Port is free.
    }
    return;
  }

  try {
    const output = execSync(`lsof -ti tcp:${port}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    for (const pid of output.split(/\s+/).filter(Boolean)) {
      try {
        process.kill(Number(pid), "SIGTERM");
        console.log(`Stopped process ${pid} on port ${port}`);
      } catch {
        // Process may already be gone.
      }
    }
  } catch {
    // Port is free.
  }
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  killPorts();
}
