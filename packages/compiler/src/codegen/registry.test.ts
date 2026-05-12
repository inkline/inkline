import { describe, it, expect } from "vitest";
import { createRegistry, defineTarget, builtinRegistry } from "./registry.ts";

describe("createRegistry", () => {
  it("starts empty", () => {
    const reg = createRegistry();
    expect(reg.list()).toEqual([]);
  });

  it("register and get", () => {
    const reg = createRegistry();
    const target = defineTarget({ name: "react" });
    reg.register(target);
    expect(reg.get("react")).toBe(target);
  });

  it("has returns true for registered targets", () => {
    const reg = createRegistry();
    reg.register(defineTarget({ name: "react" }));
    expect(reg.has("react")).toBe(true);
    expect(reg.has("vue")).toBe(false);
  });

  it("list returns registered target names", () => {
    const reg = createRegistry();
    reg.register(defineTarget({ name: "react" }));
    reg.register(defineTarget({ name: "solid" }));
    expect(reg.list()).toEqual(["react", "solid"]);
  });

  it("get returns undefined for unregistered target", () => {
    const reg = createRegistry();
    expect(reg.get("react")).toBeUndefined();
  });

  it("overwrites on re-register", () => {
    const reg = createRegistry();
    const t1 = defineTarget({ name: "react" });
    const t2 = defineTarget({ name: "react" });
    reg.register(t1);
    reg.register(t2);
    expect(reg.get("react")).toBe(t2);
  });
});

describe("defineTarget", () => {
  it("returns the target unchanged", () => {
    const target = { name: "vue" as const };
    expect(defineTarget(target)).toBe(target);
  });
});

describe("builtinRegistry", () => {
  it("is a valid TargetRegistry", () => {
    expect(typeof builtinRegistry.get).toBe("function");
    expect(typeof builtinRegistry.has).toBe("function");
    expect(typeof builtinRegistry.list).toBe("function");
  });

  it("does not expose register method", () => {
    expect("register" in builtinRegistry).toBe(true);
  });
});
