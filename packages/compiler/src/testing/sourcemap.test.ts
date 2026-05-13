import { describe, it, expect } from "vitest";
import { expectMappingAt } from "./sourcemap.ts";
import type { GeneratedFile } from "../codegen/context.ts";
import { SourceMapBuilder } from "../core/sourcemap.ts";

function makeFileWithMap(): GeneratedFile {
  const sm = new SourceMapBuilder();
  sm.add(0, 0, "test.tsx", 0, 0);
  sm.add(1, 2, "test.tsx", 4, 10);
  return {
    path: "Counter.tsx",
    contents: "line 0\n  line 1",
    sourceMap: sm.toJSON("Counter.tsx"),
  };
}

describe("expectMappingAt", () => {
  it("resolves a valid mapping", () => {
    const file = makeFileWithMap();
    expect(() =>
      expectMappingAt(file, 0, 0).resolvesTo({
        originalLine: 0,
        originalColumn: 0,
      }),
    ).not.toThrow();
  });

  it("resolves with tolerance", () => {
    const file = makeFileWithMap();
    expect(() =>
      expectMappingAt(file, 1, 2).resolvesTo({
        originalLine: 4,
        originalColumn: 10,
        tolerance: 1,
      }),
    ).not.toThrow();
  });

  it("throws for non-matching mapping", () => {
    const file = makeFileWithMap();
    expect(() =>
      expectMappingAt(file, 0, 0).resolvesTo({
        originalLine: 99,
        originalColumn: 99,
      }),
    ).toThrow("No mapping");
  });

  it("throws when file has no source map", () => {
    const file: GeneratedFile = {
      path: "x.tsx",
      contents: "x",
    };
    expect(() =>
      expectMappingAt(file, 0, 0).resolvesTo({
        originalLine: 0,
        originalColumn: 0,
      }),
    ).toThrow("no sourceMap");
  });
});
