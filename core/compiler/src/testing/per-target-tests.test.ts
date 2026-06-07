// Guard test: enforces the per-target codegen test convention. Each test file under
// `codegen/targets/<name>/` must exercise ONLY its own target — no shared, multi-target suites
// and no iteration over a target list. This fails CI the moment that convention regresses.
//
// See core/compiler/AGENTS.md → "Tests" and docs/adding-a-target.md.

import { readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { ALL_TARGETS } from "../codegen/context.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGETS_DIR = resolve(__dirname, "..", "codegen", "targets");

function findTestFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__snapshots__") continue;
      out.push(...findTestFiles(full));
    } else if (entry.name.endsWith(".test.ts")) {
      out.push(full);
    }
  }
  return out;
}

const TARGETS = new Set<string>(ALL_TARGETS);
const testFiles = findTestFiles(TARGETS_DIR);
const targetOf = (path: string): string => path.split("/codegen/targets/")[1]!.split("/")[0]!;

describe("per-target test convention", () => {
  it("discovers the target test files", () => {
    expect(testFiles.length).toBeGreaterThan(0);
  });

  for (const path of testFiles) {
    const target = targetOf(path);
    const rel = path.split("/codegen/targets/")[1];
    const src = readFileSync(path, "utf-8");

    it(`${rel} exercises only the "${target}" target`, () => {
      // Every test under codegen/targets/ must live inside a per-target directory. A file directly
      // under targets/ or in a non-target folder (e.g. a shared __tests__/) is a misplaced or
      // shared multi-target test — no longer allowed; move it under codegen/targets/<target>/.
      expect(
        TARGETS.has(target),
        `${rel} is not inside a codegen/targets/<target>/ directory — split it per target`,
      ).toBe(true);

      // (A) never imports a sibling target's module.
      const foreignImports = [...src.matchAll(/from\s+["']\.\.\/([a-z]+)\/index(?:\.ts)?["']/g)]
        .map((m) => m[1]!)
        .filter((t) => TARGETS.has(t) && t !== target);
      expect(foreignImports, "imports another target's index.ts").toEqual([]);

      // (B) every compileTo*/emit* call names THIS target, never another.
      const named = [
        ...[...src.matchAll(/compileTo(?:Checked|All|Files)?\([^,]+,\s*["']([a-z]+)["']/g)].map(
          (m) => m[1]!,
        ),
        ...[...src.matchAll(/\bemit(?:Code|WithCtx|WithFile)\(\s*([A-Za-z]\w*)\s*,/g)].map(
          (m) => m[1]!,
        ),
      ].filter((t) => TARGETS.has(t) && t !== target);
      expect(named, `exercises a target other than "${target}": ${named.join(", ")}`).toEqual([]);

      // (C) never iterates a target list.
      expect(src.includes("ALL_TARGETS"), "iterates ALL_TARGETS").toBe(false);
      expect(
        /\bof\s*\[\s*["'](?:react|solid|vue|svelte|angular|qwik|astro)["']/.test(src),
        "iterates a hard-coded target array",
      ).toBe(false);
    });
  }
});
