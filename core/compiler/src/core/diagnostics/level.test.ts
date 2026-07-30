import { describe, it, expect } from "vitest";
import { ALL_SEVERITIES, isDiagnosticSeverity, meetsLevel } from "./level.ts";

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

describe("ALL_SEVERITIES", () => {
  it("lists every severity, ordered low → high", () => {
    expect(ALL_SEVERITIES).toEqual(["info", "warning", "error"]);
  });

  it("orders so that each entry meets the level of every earlier one", () => {
    for (const [i, severity] of ALL_SEVERITIES.entries()) {
      for (const level of ALL_SEVERITIES.slice(0, i + 1)) {
        expect(meetsLevel(severity, level)).toBe(true);
      }
    }
  });
});

describe("isDiagnosticSeverity", () => {
  it("accepts every severity", () => {
    for (const severity of ALL_SEVERITIES) {
      expect(isDiagnosticSeverity(severity)).toBe(true);
    }
  });

  it("rejects strings that are not severities", () => {
    expect(isDiagnosticSeverity("loud")).toBe(false);
    expect(isDiagnosticSeverity("note")).toBe(false);
    expect(isDiagnosticSeverity("Error")).toBe(false);
    expect(isDiagnosticSeverity("")).toBe(false);
  });

  it("rejects non-strings, including object keys that exist on the rank map", () => {
    expect(isDiagnosticSeverity(undefined)).toBe(false);
    expect(isDiagnosticSeverity(null)).toBe(false);
    expect(isDiagnosticSeverity(0)).toBe(false);
    expect(isDiagnosticSeverity(["error"])).toBe(false);
  });

  it("rejects inherited Object.prototype members", () => {
    expect(isDiagnosticSeverity("toString")).toBe(false);
    expect(isDiagnosticSeverity("constructor")).toBe(false);
  });
});
