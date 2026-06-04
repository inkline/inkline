import { describe, it, expect } from "vitest";
import { ALL_TARGETS } from "../codegen/context.ts";
import { compileFixture } from "./harness.ts";

describe("compileFixture", () => {
  it("compiles Counter fixture without errors", async () => {
    const result = await compileFixture("Counter");
    expect(result.diagnostics).toEqual([]);
    expect(result.ir).toBeDefined();
  });

  it("returns files keyed by target", async () => {
    const result = await compileFixture("Counter");
    for (const target of ALL_TARGETS) {
      expect(target in result.files, `missing target: ${target}`).toBe(true);
    }
  });

  it("compiles Button fixture and extracts props from parameter type", async () => {
    const result = await compileFixture("IButton");
    expect(result.diagnostics).toEqual([]);
    const comp = result.ir?.module.components[0];
    expect(comp).toBeDefined();
    expect(comp!.props).toHaveLength(2);
    expect(comp!.props[0]!.name).toBe("label");
    expect(comp!.props[0]!.required).toBe(true);
    expect(comp!.props[1]!.name).toBe("disabled");
    expect(comp!.props[1]!.required).toBe(false);
  });

  it("resolves cross-file props from imported interface", async () => {
    const result = await compileFixture("CrossFileStyled");
    expect(result.diagnostics).toEqual([]);
    const comp = result.ir?.module.components[0];
    expect(comp).toBeDefined();
    const propNames = comp!.props.map((p) => p.name);
    expect(propNames).toContain("label");
    expect(propNames).toContain("size");
    expect(comp!.props.find((p) => p.name === "label")!.required).toBe(false);
    expect(comp!.props.find((p) => p.name === "size")!.required).toBe(false);
  });

  it("emits defineProps with pass-through props in Vue output", async () => {
    const result = await compileFixture("CrossFileStyled");
    const vue = result.files.vue![0]!.contents;
    expect(vue).toContain("defineProps<CrossFileStyledProps>()");
    expect(vue).toContain("export interface CrossFileStyledProps extends CrossFileBaseProps");
    expect(vue).toContain('{ type CrossFileBaseProps } from "./CrossFileBase.vue"');
    expect(vue).toContain(':label="label"');
  });

  it("compiles Conditional fixture", async () => {
    const result = await compileFixture("Conditional");
    expect(result.diagnostics).toEqual([]);
  });

  it("throws for nonexistent fixture", async () => {
    await expect(compileFixture("Nonexistent")).rejects.toThrow();
  });
});
