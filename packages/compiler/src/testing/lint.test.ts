import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { lintEmittedForTarget, type LintResult } from "./lint.ts";
import { compileFixture } from "./harness.ts";
import type { TargetConformanceSpec, TargetName } from "../codegen/context.ts";
import { builtinRegistry } from "../codegen/registry.ts";

const stubConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { tool: "oxlint", config: "" },
  typecheck: { tsconfig: "", dtsImports: [] },
  invariants: [],
};

describe("lintEmittedForTarget", () => {
  it("returns pass for empty file list", async () => {
    const result: LintResult = await lintEmittedForTarget(stubConformance, []);
    expect(result.pass).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
    expect(result.raw).toBe("");
  });

  it("returns pass for empty config", async () => {
    const result: LintResult = await lintEmittedForTarget(stubConformance, [
      { path: "test.ts", contents: "const x = 1;" },
    ]);
    expect(result.pass).toBe(true);
  });

  it("exports LintResult type", () => {
    const r: LintResult = { pass: true, diagnostics: [], raw: "" };
    expect(r.pass).toBe(true);
  });
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");
const TARGETS: TargetName[] = ["react", "solid", "vue", "svelte", "angular", "qwik", "astro"];

const fixtures = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith(".ink.tsx"))
  .map((f) => f.replace(".ink.tsx", ""));

describe("lint emitted fixtures", { timeout: 120_000 }, () => {
  for (const fixture of fixtures) {
    for (const targetName of TARGETS) {
      it(`${fixture} → ${targetName}`, async () => {
        const compiled = await compileFixture(fixture, TARGETS);

        if (compiled.diagnostics.some((d) => d.severity === "error")) return;

        const files = compiled.files[targetName];
        if (!files || files.length === 0) return;

        const target = builtinRegistry.get(targetName);
        if (!target?.conformance) return;

        const result = await lintEmittedForTarget(target.conformance, files);
        expect(
          result.pass,
          `lint failures:\n${result.diagnostics.map((d) => d.title).join("\n")}`,
        ).toBe(true);
      });
    }
  }
});
