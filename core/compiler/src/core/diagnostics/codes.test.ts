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
      "INK0080",
      "INK0090",
      "INK0100",
      "INK0110",
      "INK0120",
      "INK0130",
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

  it("every entry has a url", () => {
    for (const code of codes) {
      expect(DIAGNOSTICS[code].url).toMatch(/^https:\/\/docs\.inkline\.dev/);
    }
  });

  it("placeholder syntax is consistent ({word})", () => {
    for (const code of codes) {
      const matches = DIAGNOSTICS[code].title.match(/\{(\w+)\}/g) ?? [];
      for (const m of matches) {
        expect(m).toMatch(/^\{\w+\}$/);
      }
    }
  });

  it("codes with placeholders: INK0030, INK0044, INK0080, INK0090, INK0100, INK0110, INK0120, INK0130", () => {
    const withPlaceholders = codes.filter((c) => /\{\w+\}/.test(DIAGNOSTICS[c].title));
    expect(withPlaceholders.sort()).toEqual([
      "INK0030",
      "INK0044",
      "INK0080",
      "INK0090",
      "INK0100",
      "INK0110",
      "INK0120",
      "INK0130",
    ]);
  });
});
