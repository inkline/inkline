import { existsSync } from "node:fs";
import { resolve } from "node:path";

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

const lockfileMap: [string, PackageManager][] = [
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["bun.lockb", "bun"],
  ["bun.lock", "bun"],
  ["package-lock.json", "npm"],
];

export function detectPackageManager(cwd: string = process.cwd()): PackageManager {
  for (const [file, pm] of lockfileMap) {
    if (existsSync(resolve(cwd, file))) {
      return pm;
    }
  }
  return "npm";
}

const runnerMap: Record<PackageManager, string> = {
  pnpm: "pnpx",
  yarn: "yarn dlx",
  bun: "bunx",
  npm: "npx",
};

export function getPackageManagerRunner(pm: PackageManager): string {
  return runnerMap[pm];
}
