import { describe, it, expect } from "vitest";
import { SourceMapBuilder } from "./sourcemap.ts";

describe("SourceMapBuilder", () => {
  it("produces valid v3 source map", () => {
    const sm = new SourceMapBuilder();
    sm.add(0, 0, "test.tsx", 0, 0);
    const json = sm.toJSON("output.js");
    const map = JSON.parse(json);

    expect(map.version).toBe(3);
    expect(map.file).toBe("output.js");
    expect(map.sources).toEqual(["test.tsx"]);
    expect(map.names).toEqual([]);
    expect(typeof map.mappings).toBe("string");
    expect(map.mappings.length).toBeGreaterThan(0);
  });

  it("handles empty map", () => {
    const sm = new SourceMapBuilder();
    const json = sm.toJSON();
    const map = JSON.parse(json);

    expect(map.version).toBe(3);
    expect(map.sources).toEqual([]);
    expect(map.mappings).toBe("");
  });

  it("deduplicates sources", () => {
    const sm = new SourceMapBuilder();
    sm.add(0, 0, "a.tsx", 0, 0);
    sm.add(1, 0, "a.tsx", 1, 0);
    const map = JSON.parse(sm.toJSON());

    expect(map.sources).toEqual(["a.tsx"]);
  });

  it("tracks multiple sources", () => {
    const sm = new SourceMapBuilder();
    sm.add(0, 0, "a.tsx", 0, 0);
    sm.add(1, 0, "b.tsx", 0, 0);
    const map = JSON.parse(sm.toJSON());

    expect(map.sources).toEqual(["a.tsx", "b.tsx"]);
  });

  it("separates lines with semicolons", () => {
    const sm = new SourceMapBuilder();
    sm.add(0, 0, "test.tsx", 0, 0);
    sm.add(2, 0, "test.tsx", 2, 0);
    const map = JSON.parse(sm.toJSON());

    const groups = map.mappings.split(";");
    expect(groups.length).toBe(3);
    expect(groups[0]!.length).toBeGreaterThan(0);
    expect(groups[1]).toBe("");
    expect(groups[2]!.length).toBeGreaterThan(0);
  });

  it("separates segments on same line with commas", () => {
    const sm = new SourceMapBuilder();
    sm.add(0, 0, "test.tsx", 0, 0);
    sm.add(0, 10, "test.tsx", 0, 10);
    const map = JSON.parse(sm.toJSON());

    const segments = map.mappings.split(",");
    expect(segments.length).toBe(2);
  });

  it("addSource returns consistent indices", () => {
    const sm = new SourceMapBuilder();
    expect(sm.addSource("a.tsx")).toBe(0);
    expect(sm.addSource("b.tsx")).toBe(1);
    expect(sm.addSource("a.tsx")).toBe(0);
  });

  it("encodes VLQ correctly for zero offset", () => {
    const sm = new SourceMapBuilder();
    sm.add(0, 0, "test.tsx", 0, 0);
    const map = JSON.parse(sm.toJSON());
    expect(map.mappings).toBe("AAAA");
  });
});
