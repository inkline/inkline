import { describe, it, expect } from "vitest";
import { lintEmittedForTarget, type LintResult } from "./lint.ts";
import type { TargetConformanceSpec } from "../codegen/context.ts";

const stubConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { eslintConfig: "./tsconfigs/react.eslintrc.json", requiredPlugins: [] },
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

  it("exports LintResult type", () => {
    const r: LintResult = { pass: true, diagnostics: [], raw: "" };
    expect(r.pass).toBe(true);
  });
});
