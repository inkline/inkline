import { describe, it, expect } from "vitest";
import { compileFixture } from "./harness.ts";

describe("compileFixture", () => {
  it("compiles Counter fixture without errors", async () => {
    const result = await compileFixture("Counter", ["react"]);
    expect(result.diagnostics).toEqual([]);
    expect(result.ir).toBeDefined();
  });

  it("returns files keyed by target", async () => {
    const result = await compileFixture("Counter", ["react", "solid"]);
    expect("react" in result.files).toBe(true);
    expect("solid" in result.files).toBe(true);
  });

  it("compiles Button fixture", async () => {
    const result = await compileFixture("Button", ["react"]);
    expect(result.diagnostics).toEqual([]);
  });

  it("compiles Conditional fixture", async () => {
    const result = await compileFixture("Conditional", ["react"]);
    expect(result.diagnostics).toEqual([]);
  });

  it("throws for nonexistent fixture", async () => {
    await expect(compileFixture("Nonexistent", ["react"])).rejects.toThrow();
  });
});
