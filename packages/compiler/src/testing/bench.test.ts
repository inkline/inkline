import { describe, it, expect } from "vitest";
import type { BenchResult, BenchSuiteResult } from "./bench.ts";

describe("bench types", () => {
  it("BenchResult shape is correct", () => {
    const r: BenchResult = { name: "test", hz: 100, meanMs: 10, p99Ms: 15 };
    expect(r.name).toBe("test");
    expect(r.hz).toBe(100);
  });

  it("BenchSuiteResult shape is correct", () => {
    const r: BenchSuiteResult = {
      results: [{ name: "test", hz: 100, meanMs: 10, p99Ms: 15 }],
      regressions: [],
    };
    expect(r.results).toHaveLength(1);
    expect(r.regressions).toHaveLength(0);
  });
});
