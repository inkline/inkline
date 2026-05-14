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
});
