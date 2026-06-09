import { describe, it, expect } from "vitest";
import { meetsLevel } from "./level.ts";

describe("meetsLevel", () => {
  it("passes severities at or above the level", () => {
    expect(meetsLevel("error", "warning")).toBe(true);
    expect(meetsLevel("warning", "warning")).toBe(true);
    expect(meetsLevel("error", "error")).toBe(true);
  });

  it("filters severities below the level", () => {
    expect(meetsLevel("info", "warning")).toBe(false);
    expect(meetsLevel("warning", "error")).toBe(false);
    expect(meetsLevel("info", "error")).toBe(false);
  });

  it("treats info as the lowest floor — everything passes", () => {
    expect(meetsLevel("info", "info")).toBe(true);
    expect(meetsLevel("warning", "info")).toBe(true);
    expect(meetsLevel("error", "info")).toBe(true);
  });
});
