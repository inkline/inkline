import { describe, it, expect } from "vitest";
import { formatDiagnostic } from "./diagnostics.ts";
import type { Diagnostic } from "@inkline/compiler";

function makeDiag(overrides: Partial<Diagnostic> = {}): Diagnostic {
  return {
    code: "INK001" as Diagnostic["code"],
    severity: "error",
    title: "Something went wrong",
    help: undefined,
    url: "",
    loc: { file: "Button.ink.tsx", line: 10, column: 5, offset: 100, length: 10 },
    ...overrides,
  };
}

describe("formatDiagnostic", () => {
  it("formats location, severity, code, and title", () => {
    const msg = formatDiagnostic(makeDiag());
    expect(msg).toBe("Button.ink.tsx:10:5  error  INK001  Something went wrong");
  });

  it("appends help text when present", () => {
    const msg = formatDiagnostic(makeDiag({ help: "Try adding a return type" }));
    expect(msg).toContain("\n    help: Try adding a return type");
  });

  it("appends docs url when present", () => {
    const msg = formatDiagnostic(makeDiag({ url: "https://docs.example.com/INK001" }));
    expect(msg).toContain("\n    docs: https://docs.example.com/INK001");
  });

  it("uses <unknown> for unknown file locations", () => {
    const msg = formatDiagnostic(
      makeDiag({ loc: { file: "<unknown>", line: 0, column: 0, offset: 0, length: 0 } }),
    );
    expect(msg.startsWith("<unknown>  error")).toBe(true);
  });
});
