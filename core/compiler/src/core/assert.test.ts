import { describe, it, expect } from "vitest";
import { assertNever } from "./assert.ts";

describe("assertNever", () => {
  it("throws with the JSON-stringified value", () => {
    expect(() => assertNever("foo" as never)).toThrow('Unhandled case: "foo"');
  });

  it("throws with numeric value", () => {
    expect(() => assertNever(42 as never)).toThrow("Unhandled case: 42");
  });

  it("throws with object value", () => {
    expect(() => assertNever({ kind: "Unknown" } as never)).toThrow(
      'Unhandled case: {"kind":"Unknown"}',
    );
  });

  it("throws with null", () => {
    expect(() => assertNever(null as never)).toThrow("Unhandled case: null");
  });
});
