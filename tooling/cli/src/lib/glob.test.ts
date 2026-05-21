import { describe, it, expect } from "vitest";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { expandGlobs } from "./glob.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "core",
  "compiler",
  "src",
  "__fixtures__",
);

describe("expandGlobs", () => {
  it("returns plain paths as-is", () => {
    expect(expandGlobs(["foo.ts", "bar.ts"])).toEqual(["foo.ts", "bar.ts"]);
  });

  it("expands glob patterns to matching files", () => {
    const result = expandGlobs([resolve(FIXTURES_DIR, "Counter.ink.tsx")]);
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("Counter.ink.tsx");
  });

  it("expands wildcard patterns", () => {
    const result = expandGlobs([resolve(FIXTURES_DIR, "*.ink.tsx")]);
    expect(result.length).toBeGreaterThan(1);
    expect(result.every((f) => f.endsWith(".ink.tsx"))).toBe(true);
  });

  it("returns empty array for non-matching globs", () => {
    expect(expandGlobs([resolve(FIXTURES_DIR, "*.nonexistent")])).toEqual([]);
  });
});
