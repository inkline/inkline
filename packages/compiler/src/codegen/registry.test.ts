import { describe, it, expect } from "vitest";
import { createRegistry, defineTarget, builtinRegistry } from "./registry.ts";
import type { Target } from "./context.ts";

function stubTarget(name: "react" | "solid" | "vue" | "svelte"): Target {
  return {
    name,
    rewrites: {
      reactiveRead: { kind: "strip-call" },
      setterStyle: { kind: "function-call" },
      refAccess: { kind: "bare" },
      jsxAttrCasing: "html",
      eventNameCase: "camel",
    },
    emit: () => ({
      componentName: "X",
      root: { kind: "CFile" as const, flavor: "tsx" as const, children: [] },
      fileName: "x.tsx",
    }),
  };
}

describe("createRegistry", () => {
  it("starts empty", () => {
    const reg = createRegistry();
    expect(reg.list()).toEqual([]);
  });

  it("register and get", () => {
    const reg = createRegistry();
    const target = stubTarget("react");
    reg.register(target);
    expect(reg.get("react")).toBe(target);
  });

  it("has returns true for registered targets", () => {
    const reg = createRegistry();
    reg.register(stubTarget("react"));
    expect(reg.has("react")).toBe(true);
    expect(reg.has("vue")).toBe(false);
  });

  it("list returns registered target names", () => {
    const reg = createRegistry();
    reg.register(stubTarget("react"));
    reg.register(stubTarget("solid"));
    expect(reg.list()).toEqual(["react", "solid"]);
  });

  it("get returns undefined for unregistered target", () => {
    const reg = createRegistry();
    expect(reg.get("react")).toBeUndefined();
  });

  it("overwrites on re-register", () => {
    const reg = createRegistry();
    const t1 = stubTarget("react");
    const t2 = stubTarget("react");
    reg.register(t1);
    reg.register(t2);
    expect(reg.get("react")).toBe(t2);
  });
});

describe("defineTarget", () => {
  it("returns the target unchanged", () => {
    const target = stubTarget("vue");
    expect(defineTarget(target)).toBe(target);
  });
});

describe("builtinRegistry", () => {
  it("has all 4 built-in targets registered", () => {
    expect(builtinRegistry.has("react")).toBe(true);
    expect(builtinRegistry.has("solid")).toBe(true);
    expect(builtinRegistry.has("svelte")).toBe(true);
    expect(builtinRegistry.has("vue")).toBe(true);
  });

  it("list returns 4 target names", () => {
    expect(builtinRegistry.list()).toHaveLength(4);
  });

  it("does not expose register method", () => {
    expect("register" in builtinRegistry).toBe(false);
  });
});
