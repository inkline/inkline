import { describe, it, expect } from "vitest";
import { react } from "./react/index.ts";
import { solid } from "./solid/index.ts";
import { vue } from "./vue/index.ts";
import { svelte } from "./svelte/index.ts";
import type { GeneratedFile, TargetConformanceSpec } from "../context.ts";

function runInvariants(conformance: TargetConformanceSpec, file: GeneratedFile) {
  return conformance.invariants.flatMap((inv) => inv(file));
}

describe("target conformance specs", () => {
  it("react conformance is attached and validates .tsx", () => {
    expect(react.conformance).toBeDefined();
    const c = react.conformance!;
    expect(c.lint.requiredPlugins).toContain("react");
    expect(c.lint.requiredPlugins).toContain("react-hooks");
    expect(c.typecheck.dtsImports).toContain("react");
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.vue", contents: "" })).toHaveLength(1);
  });

  it("solid conformance is attached with control-flow imports", () => {
    expect(solid.conformance).toBeDefined();
    const c = solid.conformance!;
    expect(c.controlFlowImports.if).toEqual({ module: "solid-js", named: ["Show"] });
    expect(c.controlFlowImports.for).toEqual({ module: "solid-js", named: ["For"] });
    expect(c.controlFlowImports.switch).toEqual({
      module: "solid-js",
      named: ["Switch", "Match"],
    });
    expect(c.lint.requiredPlugins).toContain("solid");
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(0);
  });

  it("vue conformance is attached and validates .vue", () => {
    expect(vue.conformance).toBeDefined();
    const c = vue.conformance!;
    expect(c.lint.requiredPlugins).toContain("vue");
    expect(c.typecheck.dtsImports).toContain("vue");
    expect(runInvariants(c, { path: "X.vue", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("svelte conformance is attached and validates .svelte", () => {
    expect(svelte.conformance).toBeDefined();
    const c = svelte.conformance!;
    expect(c.lint.requiredPlugins).toContain("svelte");
    expect(c.typecheck.dtsImports).toContain("svelte");
    expect(runInvariants(c, { path: "X.svelte", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("all targets have no control-flow imports except solid", () => {
    expect(Object.keys(react.conformance!.controlFlowImports)).toHaveLength(0);
    expect(Object.keys(vue.conformance!.controlFlowImports)).toHaveLength(0);
    expect(Object.keys(svelte.conformance!.controlFlowImports)).toHaveLength(0);
    expect(Object.keys(solid.conformance!.controlFlowImports)).toHaveLength(3);
  });
});
