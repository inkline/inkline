import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export type Framework = "react" | "vue" | "svelte" | "solid" | "angular" | "qwik" | "astro";

const frameworkDeps: [string, Framework][] = [
  ["react", "react"],
  ["vue", "vue"],
  ["svelte", "svelte"],
  ["solid-js", "solid"],
  ["@angular/core", "angular"],
  ["@builder.io/qwik", "qwik"],
  ["astro", "astro"],
];

export function detectFrameworks(cwd: string = process.cwd()): Framework[] {
  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(readFileSync(resolve(cwd, "package.json"), "utf-8"));
  } catch {
    return [];
  }

  const allDeps = {
    ...(pkg.dependencies as Record<string, string> | undefined),
    ...(pkg.devDependencies as Record<string, string> | undefined),
  };

  return frameworkDeps.filter(([dep]) => dep in allDeps).map(([, fw]) => fw);
}
