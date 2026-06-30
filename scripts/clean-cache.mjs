import { rmSync } from "node:fs";

const CACHE_DIRS = [".next", "node_modules/.cache"];

export function cleanCache() {
  for (const dir of CACHE_DIRS) {
    try {
      rmSync(dir, { recursive: true, force: true });
      console.log(`Cleared ${dir}`);
    } catch {
      // Ignore missing cache folders.
    }
  }
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  cleanCache();
}
