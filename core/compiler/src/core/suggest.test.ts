import { describe, it, expect } from "vitest";
import { editDistance, suggestClosest } from "./suggest.ts";
import { ALL_TARGETS } from "../codegen/context.ts";

describe("editDistance", () => {
  it("is zero for identical strings", () => {
    expect(editDistance("react", "react")).toBe(0);
  });

  it("counts a single substitution", () => {
    expect(editDistance("reakt", "react")).toBe(1);
  });

  it("counts insertions and deletions", () => {
    expect(editDistance("vu", "vue")).toBe(1);
    expect(editDistance("svelte5", "svelte")).toBe(1);
  });

  it("counts a transposition as one edit, not two", () => {
    expect(editDistance("raect", "react")).toBe(1);
    expect(editDistance("svetle", "svelte")).toBe(1);
    expect(editDistance("astor", "astro")).toBe(1);
  });

  it("handles empty inputs", () => {
    expect(editDistance("", "vue")).toBe(3);
    expect(editDistance("vue", "")).toBe(3);
  });
});

describe("suggestClosest", () => {
  it("suggests the closest target for a typo", () => {
    expect(suggestClosest("reakt", ALL_TARGETS)).toBe("react");
    expect(suggestClosest("vu", ALL_TARGETS)).toBe("vue");
    expect(suggestClosest("angulr", ALL_TARGETS)).toBe("angular");
  });

  // A five-letter name allows one edit, so a transposition only suggests anything because the
  // distance charges it as one. This is the case the config-file paths depend on.
  it("suggests through a transposition in a short name", () => {
    expect(suggestClosest("raect", ALL_TARGETS)).toBe("react");
  });

  it("is case-insensitive", () => {
    expect(suggestClosest("React", ALL_TARGETS)).toBe("react");
  });

  it("returns undefined when nothing is close enough", () => {
    expect(suggestClosest("nuxt", ALL_TARGETS)).toBeUndefined();
    expect(suggestClosest("", ALL_TARGETS)).toBeUndefined();
  });

  it("returns undefined for an empty candidate list", () => {
    expect(suggestClosest("react", [])).toBeUndefined();
  });
});
