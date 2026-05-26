import { existsSync } from "node:fs";
import { resolve } from "node:path";

export type Bundler = "vite" | "webpack" | "rollup";

const configPatterns: [string[], Bundler][] = [
  [["vite.config.ts", "vite.config.js", "vite.config.mts", "vite.config.mjs"], "vite"],
  [["webpack.config.ts", "webpack.config.js"], "webpack"],
  [["rollup.config.ts", "rollup.config.js", "rollup.config.mts", "rollup.config.mjs"], "rollup"],
];

export interface BundlerDetectionResult {
  bundler: Bundler;
  configPath: string;
}

export function detectBundler(cwd: string = process.cwd()): BundlerDetectionResult | undefined {
  for (const [patterns, bundler] of configPatterns) {
    for (const pattern of patterns) {
      const configPath = resolve(cwd, pattern);
      if (existsSync(configPath)) {
        return { bundler, configPath };
      }
    }
  }
  return undefined;
}
