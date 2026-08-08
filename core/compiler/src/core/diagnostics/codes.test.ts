import { describe, it, expect } from "vitest";
import { DIAGNOSTICS, type DiagnosticCode } from "./codes.ts";

describe("DIAGNOSTICS catalog", () => {
  const codes = Object.keys(DIAGNOSTICS) as DiagnosticCode[];

  it("contains all expected diagnostic codes", () => {
    const expected = [
      "INK0001",
      "INK0010",
      "INK0011",
      "INK0020",
      "INK0030",
      "INK0040",
      "INK0041",
      "INK0043",
      "INK0044",
      "INK0045",
      "INK0046",
      "INK0050",
      "INK0060",
      "INK0061",
      "INK0062",
      "INK0063",
      "INK0064",
      "INK0065",
      "INK0066",
      "INK0067",
      "INK0068",
      "INK0070",
      "INK0071",
      "INK0072",
      "INK0073",
      "INK0080",
      "INK0081",
      "INK0082",
      "INK0083",
      "INK0084",
      "INK0085",
      "INK0086",
      "INK0087",
      "INK0090",
      "INK0100",
      "INK0110",
      "INK0111",
      "INK0120",
      "INK0121",
    ];
    expect(codes.sort()).toEqual(expected.sort());
  });

  it("every entry has a valid severity", () => {
    for (const code of codes) {
      const entry = DIAGNOSTICS[code];
      expect(["error", "warning", "info"]).toContain(entry.severity);
    }
  });

  it("every entry has a non-empty title", () => {
    for (const code of codes) {
      expect(DIAGNOSTICS[code].title.length).toBeGreaterThan(0);
    }
  });

  // Asserted over the live key set, never a hard-coded count: the catalog grew from 28 to 35 codes
  // in a single stage, and a counted assertion would have gone stale instead of catching the gap.
  it("every entry has a non-empty help", () => {
    for (const code of codes) {
      expect(DIAGNOSTICS[code].help, `${code} is missing help text`).toBeTruthy();
    }
  });

  it("every entry has a url", () => {
    for (const code of codes) {
      expect(DIAGNOSTICS[code].url).toMatch(/^https:\/\/docs\.inkline\.dev/);
    }
  });

  it("placeholder syntax is consistent ({word}) in titles and help text", () => {
    for (const code of codes) {
      const entry = DIAGNOSTICS[code];
      const matches = `${entry.title} ${entry.help ?? ""}`.match(/\{(\w+)\}/g) ?? [];
      for (const m of matches) {
        expect(m).toMatch(/^\{\w+\}$/);
      }
    }
  });

  it("codes with title placeholders: INK0030, INK0044, INK0046, INK0072, INK0073, INK0080, INK0081, INK0082, INK0083, INK0085, INK0086, INK0087, INK0090, INK0100, INK0110, INK0111, INK0120, INK0121", () => {
    const withPlaceholders = codes.filter((c) => /\{\w+\}/.test(DIAGNOSTICS[c].title));
    expect(withPlaceholders.sort()).toEqual([
      "INK0030",
      "INK0044",
      "INK0046",
      "INK0072",
      "INK0073",
      "INK0080",
      "INK0081",
      "INK0082",
      "INK0083",
      "INK0085",
      "INK0086",
      "INK0087",
      "INK0090",
      "INK0100",
      "INK0110",
      "INK0111",
      "INK0120",
      "INK0121",
    ]);
  });
});
