import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { typecheckEmittedForTarget, type TypecheckResult } from "./typecheck.ts";
import { compileFixture } from "./harness.ts";
import type { TargetConformanceSpec, TargetName } from "../codegen/context.ts";
import { builtinRegistry } from "../codegen/registry.ts";

const stubConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { tool: "oxlint", config: "" },
  typecheck: { tsconfig: "./tsconfigs/react.tsconfig.json", dtsImports: [] },
  invariants: [],
};

describe("typecheckEmittedForTarget", () => {
  it("returns pass for empty file list", async () => {
    const result: TypecheckResult = await typecheckEmittedForTarget(stubConformance, []);
    expect(result.pass).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
    expect(result.raw).toBe("");
  });

  it("exports TypecheckResult type", () => {
    const r: TypecheckResult = { pass: true, diagnostics: [], raw: "" };
    expect(r.pass).toBe(true);
  });
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");
const TARGETS: TargetName[] = ["react", "solid", "vue", "svelte"];

const fixtures = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith(".ink.tsx"))
  .map((f) => f.replace(".ink.tsx", ""));

describe("typecheck emitted fixtures", { timeout: 120_000 }, () => {
  for (const fixture of fixtures) {
    for (const targetName of TARGETS) {
      it(`${fixture} → ${targetName}`, async () => {
        const compiled = await compileFixture(fixture, TARGETS);

        if (compiled.diagnostics.some((d) => d.severity === "error")) return;

        const files = compiled.files[targetName];
        if (!files || files.length === 0) return;

        const target = builtinRegistry.get(targetName);
        if (!target?.conformance) return;

        const result = await typecheckEmittedForTarget(target.conformance, files);
        expect(
          result.pass,
          `typecheck failures:\n${result.diagnostics.map((d) => d.title).join("\n")}`,
        ).toBe(true);
      });
    }
  }
});
