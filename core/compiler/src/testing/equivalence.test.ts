import { describe, it, expect } from "vitest";
import type { EquivalenceResult } from "./equivalence.ts";

describe("equivalence types", () => {
  it("EquivalenceResult shape is correct", () => {
    const r: EquivalenceResult = {
      equivalent: true,
      htmlByTarget: { react: "<div/>" },
      normalizedByTarget: { react: "<div/>" },
      warnings: [],
    };
    expect(r.equivalent).toBe(true);
    expect(r.htmlByTarget.react).toBe("<div/>");
  });

  it("equivalent is false when targets produce different normalized HTML", () => {
    const r: EquivalenceResult = {
      equivalent: false,
      htmlByTarget: { react: '<div class="a">', vue: '<div class="b">' },
      normalizedByTarget: { react: '<div class="a">', vue: '<div class="b">' },
      warnings: [],
    };
    expect(r.equivalent).toBe(false);
  });

  it("warnings array can contain target-prefixed strings", () => {
    const r: EquivalenceResult = {
      equivalent: true,
      htmlByTarget: { react: "<div/>" },
      normalizedByTarget: { react: "<div/>" },
      warnings: ["[react] hydration mismatch"],
    };
    expect(r.warnings).toHaveLength(1);
    expect(r.warnings[0]).toContain("[react]");
  });
});
