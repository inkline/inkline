import { describe, it, expect } from "vitest";
import { commonPrefix } from "./common-prefix.ts";

describe("commonPrefix", () => {
  it("returns shared directory prefix", () => {
    expect(commonPrefix(["src/a/b", "src/a/c", "src/a/d"])).toBe("src/a/");
  });

  it("stops at divergence point", () => {
    expect(commonPrefix(["src/styled/badge", "src/headless/badge"])).toBe("src/");
  });

  it("returns empty for no inputs", () => {
    expect(commonPrefix([])).toBe("");
  });

  it("returns full dir for single input", () => {
    expect(commonPrefix(["src/components/badge"])).toBe("src/components/badge/");
  });

  it("handles paths with no common prefix", () => {
    expect(commonPrefix(["a/b", "c/d"])).toBe("");
  });
});
