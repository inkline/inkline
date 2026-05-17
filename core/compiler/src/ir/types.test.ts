import { describe, it, expect } from "vitest";
import { UNKNOWN_LOCATION } from "./types.ts";

describe("SourceLocation", () => {
  it("UNKNOWN_LOCATION has sentinel values", () => {
    expect(UNKNOWN_LOCATION).toEqual({
      file: "<unknown>",
      line: 0,
      column: 0,
      offset: 0,
      length: 0,
    });
  });

  it("UNKNOWN_LOCATION is frozen", () => {
    expect(Object.isFrozen(UNKNOWN_LOCATION)).toBe(true);
  });
});
