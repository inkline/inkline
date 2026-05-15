import { describe, it, expect } from "vitest";
import { react } from "./react/index.ts";
import { solid } from "./solid/index.ts";
import { vue } from "./vue/index.ts";
import { svelte } from "./svelte/index.ts";
import { angular } from "./angular/index.ts";
import { qwik } from "./qwik/index.ts";
import { astro } from "./astro/index.ts";
import type { GeneratedFile, TargetConformanceSpec } from "../context.ts";

function runInvariants(conformance: TargetConformanceSpec, file: GeneratedFile) {
  return conformance.invariants.flatMap((inv) => inv(file));
}

describe("target conformance specs", () => {
  it("react conformance uses oxlint with react plugin", () => {
    expect(react.conformance).toBeDefined();
    const c = react.conformance!;
    expect(c.lint.tool).toBe("oxlint");
    expect(c.lint.config).toContain("react.oxlintrc.json");
    expect(c.typecheck.dtsImports).toContain("react");
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.vue", contents: "" })).toHaveLength(1);
  });

  it("solid conformance uses oxlint with solid jsPlugin", () => {
    expect(solid.conformance).toBeDefined();
    const c = solid.conformance!;
    expect(c.controlFlowImports.if).toEqual({ module: "solid-js", named: ["Show"] });
    expect(c.controlFlowImports.for).toEqual({ module: "solid-js", named: ["For"] });
    expect(c.controlFlowImports.switch).toEqual({
      module: "solid-js",
      named: ["Switch", "Match"],
    });
    expect(c.lint.tool).toBe("oxlint");
    expect(c.lint.config).toContain("solid.oxlintrc.json");
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(0);
  });

  it("vue conformance uses eslint with vue plugin", () => {
    expect(vue.conformance).toBeDefined();
    const c = vue.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("vue.eslint.config.js");
    expect(c.typecheck.dtsImports).toContain("vue");
    expect(runInvariants(c, { path: "X.vue", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("svelte conformance uses eslint with svelte plugin", () => {
    expect(svelte.conformance).toBeDefined();
    const c = svelte.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("svelte.eslint.config.js");
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

  it("angular conformance uses eslint with angular plugin", () => {
    expect(angular.conformance).toBeDefined();
    const c = angular.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("angular.eslint.config.js");
    expect(c.typecheck.dtsImports).toContain("@angular/core");
    expect(runInvariants(c, { path: "X.ts", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("qwik conformance uses oxlint with qwik jsPlugin", () => {
    expect(qwik.conformance).toBeDefined();
    const c = qwik.conformance!;
    expect(c.lint.tool).toBe("oxlint");
    expect(c.lint.config).toContain("qwik.oxlintrc.json");
    expect(c.typecheck.dtsImports).toContain("@builder.io/qwik");
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.ts", contents: "" })).toHaveLength(1);
  });

  it("astro conformance uses eslint with astro plugin", () => {
    expect(astro.conformance).toBeDefined();
    const c = astro.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("astro.eslint.config.js");
    expect(c.typecheck.dtsImports).toContain("astro");
    expect(runInvariants(c, { path: "X.astro", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });
});
