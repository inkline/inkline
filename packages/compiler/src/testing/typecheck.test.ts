import { describe, it, expect } from "vitest";
import { typecheckEmittedForTarget, type TypecheckResult } from "./typecheck.ts";
import type { TargetConformanceSpec } from "../codegen/context.ts";

const stubConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { eslintConfig: "", requiredPlugins: [] },
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
