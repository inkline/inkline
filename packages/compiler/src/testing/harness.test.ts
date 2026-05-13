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

  it("compiles Button fixture and extracts props from parameter type", async () => {
    const result = await compileFixture("Button", ["react"]);
    expect(result.diagnostics).toEqual([]);
    const comp = result.ir?.module.components[0];
    expect(comp).toBeDefined();
    expect(comp!.props).toHaveLength(2);
    expect(comp!.props[0]!.name).toBe("label");
    expect(comp!.props[0]!.required).toBe(true);
    expect(comp!.props[1]!.name).toBe("disabled");
    expect(comp!.props[1]!.required).toBe(false);
  });

  it("compiles Conditional fixture", async () => {
    const result = await compileFixture("Conditional", ["react"]);
    expect(result.diagnostics).toEqual([]);
  });

  it("throws for nonexistent fixture", async () => {
    await expect(compileFixture("Nonexistent", ["react"])).rejects.toThrow();
  });
});
