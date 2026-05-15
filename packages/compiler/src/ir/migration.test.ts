import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { migrate, IR_VERSION } from "./migration.ts";
import type { IRModule } from "./render/nodes.ts";

function makeModule(version?: number): IRModule {
  const sf = ts.createSourceFile("t.tsx", "", ts.ScriptTarget.Latest, true);
  return {
    version: version ?? 0,
    fileName: "t.tsx",
    components: [],
    imports: [],
    sourceFile: sf,
  };
}

describe("migrate", () => {
  it("migrates v0 to current version", () => {
    const v0 = makeModule(0);
    const result = migrate(v0);
    expect(result.version).toBe(IR_VERSION);
  });

  it("returns same module when already at target version", () => {
    const current = makeModule(IR_VERSION);
    const result = migrate(current, IR_VERSION);
    expect(result).toBe(current);
  });

  it("throws on downgrade attempt", () => {
    const v1 = makeModule(1);
    expect(() => migrate(v1, 0)).toThrow("Cannot downgrade");
  });

  it("preserves module data through migration", () => {
    const sf = ts.createSourceFile("test.tsx", "const x = 1;", ts.ScriptTarget.Latest, true);
    const v0: IRModule = {
      version: 0,
      fileName: "test.tsx",
      components: [],
      imports: [],
      sourceFile: sf,
    };
    const result = migrate(v0, 1);
    expect(result.fileName).toBe("test.tsx");
    expect(result.sourceFile).toBe(sf);
    expect(result.components).toEqual([]);
    expect(result.version).toBe(1);
  });

  it("IR_VERSION is 1", () => {
    expect(IR_VERSION).toBe(1);
  });
});
