import { describe, it, expect } from "vitest";
import type { Diagnostic } from "@inkline/compiler";
import { createBuildReporter, formatBuildSummary } from "./report.ts";

function makeDiag(overrides: Partial<Diagnostic> = {}): Diagnostic {
  return {
    code: "INK0068" as Diagnostic["code"],
    severity: "info",
    title: "hasSlot() always returns true",
    url: "",
    loc: { file: "IInput.ink.tsx", line: 39, column: 1, offset: 0, length: 0 },
    ...overrides,
  };
}

function collectingReporter(level: Parameters<typeof createBuildReporter>[0] = "info") {
  const printed: string[] = [];
  return { printed, reporter: createBuildReporter(level, (m) => void printed.push(m)) };
}

describe("createBuildReporter", () => {
  it("prints one line for a finding raised by several targets at the same location", () => {
    const { printed, reporter } = collectingReporter();

    // What Angular and Qwik both push for a single `hasSlot()` call site.
    reporter.report([makeDiag(), makeDiag()]);

    expect(printed).toHaveLength(1);
    expect(reporter.counts).toEqual({ error: 0, warning: 0, info: 1 });
  });

  it("renders through formatDiagnostic, so a source frame still reaches the output", () => {
    const { printed, reporter } = collectingReporter();
    const source = "const a = 1;\nconst b = 2;\n";

    reporter.report(
      [makeDiag({ loc: { file: "a.ink.tsx", line: 2, column: 6, offset: 19, length: 1 } })],
      new Map([["a.ink.tsx", source]]),
    );

    // Rendering lives in `diagnostics.ts`; a reporter that formatted its own message would drop the
    // code frame and silently revert it.
    expect(printed[0]).toContain("2 | const b = 2;");
    expect(printed[0]).toContain("^");
  });

  it("omits the frame when no source is supplied for the diagnostic's file", () => {
    const { printed, reporter } = collectingReporter();

    reporter.report([makeDiag()], new Map([["other.ink.tsx", "const a = 1;\n"]]));

    expect(printed[0]).not.toContain("|");
  });

  it("deduplicates across compiled files, not just within one", () => {
    const { printed, reporter } = collectingReporter();

    reporter.report([makeDiag()]);
    reporter.report([makeDiag()]);

    expect(printed).toHaveLength(1);
  });

  it("keeps the same code at a different location", () => {
    const { printed, reporter } = collectingReporter();

    reporter.report([
      makeDiag(),
      makeDiag({ loc: { file: "IInput.ink.tsx", line: 52, column: 1, offset: 0, length: 0 } }),
      makeDiag({ loc: { file: "IButton.ink.tsx", line: 39, column: 1, offset: 0, length: 0 } }),
    ]);

    expect(printed).toHaveLength(3);
    expect(reporter.counts.info).toBe(3);
  });

  it("keeps two plugin failures, which share INK0090's unknown location", () => {
    const { printed, reporter } = collectingReporter();

    // `runPlugins` builds INK0090 at UNKNOWN_LOCATION and puts the payload in the title, so position
    // cannot separate one failing plugin from another.
    const unknown = { file: "<unknown>", line: 0, column: 0, offset: 0, length: 0 };
    reporter.report([
      makeDiag({
        code: "INK0090" as Diagnostic["code"],
        severity: "error",
        title: "Plugin 'tailwind' threw: Cannot read properties of undefined",
        loc: unknown,
      }),
      makeDiag({
        code: "INK0090" as Diagnostic["code"],
        severity: "error",
        title: "Plugin 'icons' threw: ENOENT: no such file or directory",
        loc: unknown,
      }),
    ]);

    expect(printed).toHaveLength(2);
  });

  it("keeps two targets failing differently on the same component", () => {
    const { printed, reporter } = collectingReporter();

    // The per-target emit loop pushes INK0100 at the component's own location, once per target.
    reporter.report([
      makeDiag({
        code: "INK0100" as Diagnostic["code"],
        severity: "error",
        title: "Parse failure in component 'IInput': angular: unsupported directive",
      }),
      makeDiag({
        code: "INK0100" as Diagnostic["code"],
        severity: "error",
        title: "Parse failure in component 'IInput': qwik: unsupported serialization",
      }),
    ]);

    expect(printed).toHaveLength(2);
  });

  it("keeps different codes at the same location", () => {
    const { printed, reporter } = collectingReporter();

    reporter.report([makeDiag(), makeDiag({ code: "INK0045" as Diagnostic["code"] })]);

    expect(printed).toHaveLength(2);
  });

  it("counts each severity separately", () => {
    const { reporter } = collectingReporter();

    reporter.report([
      makeDiag({ severity: "error", code: "INK0001" as Diagnostic["code"] }),
      makeDiag({ severity: "warning", code: "INK0010" as Diagnostic["code"] }),
      makeDiag({ severity: "info", code: "INK0045" as Diagnostic["code"] }),
    ]);

    expect(reporter.counts).toEqual({ error: 1, warning: 1, info: 1 });
  });

  it("drops diagnostics below the reporting level and leaves them out of the counts", () => {
    const { printed, reporter } = collectingReporter("warning");

    reporter.report([
      makeDiag({ severity: "info" }),
      makeDiag({ severity: "warning", code: "INK0010" as Diagnostic["code"] }),
    ]);

    expect(printed).toHaveLength(1);
    expect(reporter.counts).toEqual({ error: 0, warning: 1, info: 0 });
  });

  it("has no error before anything is reported", () => {
    const { reporter } = collectingReporter();
    expect(reporter.hasError).toBe(false);
  });

  it("flags an error even when it is a duplicate or below the reporting level", () => {
    // Errors outrank every reporting level today, so neither branch is reachable from the CLI's own
    // wiring — the exit status is computed before filtering precisely so it stays that way.
    const duplicate = collectingReporter();
    duplicate.reporter.report([makeDiag({ severity: "error" }), makeDiag({ severity: "error" })]);
    expect(duplicate.printed).toHaveLength(1);
    expect(duplicate.reporter.hasError).toBe(true);

    const filtered = createBuildReporter("error", () => {});
    filtered.report([makeDiag({ severity: "warning" })]);
    expect(filtered.hasError).toBe(false);
  });
});

describe("formatBuildSummary", () => {
  it("reports file count, elapsed seconds, and counts by severity", () => {
    expect(formatBuildSummary(67, 450, { error: 0, warning: 0, info: 4 })).toBe(
      "Compiled 67 files in 0.45s — 0 errors, 0 warnings, 4 notes",
    );
  });

  it("singularizes counts of one", () => {
    expect(formatBuildSummary(1, 1000, { error: 1, warning: 1, info: 1 })).toBe(
      "Compiled 1 file in 1.00s — 1 error, 1 warning, 1 note",
    );
  });
});
