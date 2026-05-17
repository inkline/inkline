import { describe, it, expect } from "vitest";
import { BANNER, assertIdentifier, serializeArgs } from "./shared.ts";

describe("BANNER", () => {
  it("marks files as generated and points at the source", () => {
    expect(BANNER).toContain("AUTO-GENERATED");
    expect(BANNER).toContain("ui/core/stories/");
  });
});

describe("assertIdentifier", () => {
  it("accepts valid identifiers", () => {
    expect(() => assertIdentifier("Button", "component")).not.toThrow();
    expect(() => assertIdentifier("_Default$1", "story")).not.toThrow();
  });

  it("rejects invalid identifiers with a labelled message", () => {
    expect(() => assertIdentifier("My-Comp", "component")).toThrow(
      /Invalid component "My-Comp": must be a valid JavaScript identifier\./,
    );
    expect(() => assertIdentifier("1st", "story name")).toThrow(/Invalid story name/);
    expect(() => assertIdentifier("", "component")).toThrow(/Invalid component/);
  });
});

describe("serializeArgs", () => {
  it("produces compact deterministic JSON", () => {
    expect(serializeArgs({ label: "Hi", disabled: true })).toBe('{"label":"Hi","disabled":true}');
  });
});
