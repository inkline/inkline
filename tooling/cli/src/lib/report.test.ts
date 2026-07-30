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

  it("counts what the level withheld, so the summary can say it was withheld", () => {
    const { reporter } = collectingReporter("warning");

    reporter.report([makeDiag({ severity: "info" })]);

    expect(reporter.counts.info).toBe(0);
    expect(reporter.suppressed).toEqual({ error: 0, warning: 0, info: 1 });
  });

  it("deduplicates withheld findings too, so suppressed counts things to fix not lines", () => {
    const { reporter } = collectingReporter("warning");

    // The same advisory from two targets is one thing to fix, whether it is printed or withheld.
    reporter.report([makeDiag({ severity: "info" }), makeDiag({ severity: "info" })]);

    expect(reporter.suppressed.info).toBe(1);
  });

  it("suppresses nothing at the info floor", () => {
    const { reporter } = collectingReporter("info");

    reporter.report([makeDiag({ severity: "info" })]);

    expect(reporter.suppressed).toEqual({ error: 0, warning: 0, info: 0 });
  });

  it("reports per batch whether that batch had an error, for the summary's file count", () => {
    const { reporter } = collectingReporter();

    expect(reporter.report([makeDiag({ severity: "info" })])).toBe(false);
    expect(
      reporter.report([makeDiag({ severity: "error", code: "INK0001" as Diagnostic["code"] })]),
    ).toBe(true);
    // Per batch, not cumulative: a later clean file must not inherit an earlier file's failure.
    expect(reporter.report([makeDiag({ code: "INK0045" as Diagnostic["code"] })])).toBe(false);
    expect(reporter.hasError).toBe(true);
  });

  it("counts a duplicate error's batch as failed even though the line is not reprinted", () => {
    const { reporter } = collectingReporter();
    const error = makeDiag({ severity: "error", code: "INK0001" as Diagnostic["code"] });

    expect(reporter.report([error])).toBe(true);
    // Deduplication is about output, not about which files failed.
    expect(reporter.report([error])).toBe(true);
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

const NONE = { error: 0, warning: 0, info: 0 } as const;

function summary(overrides: Partial<Parameters<typeof formatBuildSummary>[0]> = {}) {
  return formatBuildSummary({
    matched: 67,
    compiled: 67,
    elapsedMs: 450,
    counts: NONE,
    suppressed: NONE,
    ...overrides,
  });
}

describe("formatBuildSummary", () => {
  it("reports file count, elapsed seconds, and counts by severity", () => {
    expect(summary({ counts: { error: 0, warning: 0, info: 4 } })).toBe(
      "Compiled 67 files in 0.45s — 0 errors, 0 warnings, 4 notes",
    );
  });

  it("singularizes counts of one", () => {
    expect(
      summary({
        matched: 1,
        compiled: 1,
        elapsedMs: 1000,
        counts: { error: 1, warning: 1, info: 1 },
      }),
    ).toBe("Compiled 1 file in 1.00s — 1 error, 1 warning, 1 note");
  });

  it("says how many of the matched files compiled when some failed", () => {
    // `Compiled 67 files` alongside `2 errors` overstates what the build delivered: the loop attempts
    // every matched file, so reaching the end is not the same as producing usable output for each.
    expect(summary({ compiled: 65, counts: { error: 2, warning: 0, info: 0 } })).toBe(
      "Compiled 65 of 67 files in 0.45s — 2 errors, 0 warnings, 0 notes",
    );
  });

  it("omits the of-N form when every file compiled, so a clean build reads the same as before", () => {
    expect(summary()).toBe("Compiled 67 files in 0.45s — 0 errors, 0 warnings, 0 notes");
  });

  it("discloses withheld findings and the level that lists them", () => {
    // The point of the suffix: `0 notes` on its own is indistinguishable from a build that found
    // nothing, so a reporting level would quietly turn 12 findings into a clean-looking summary.
    expect(summary({ suppressed: { error: 0, warning: 0, info: 12 } })).toBe(
      "Compiled 67 files in 0.45s — 0 errors, 0 warnings, 0 notes" +
        " (12 notes hidden; run with --report-level info to list)",
    );
  });

  it("names the lowest withheld severity, which is the least the reader must ask for", () => {
    expect(summary({ suppressed: { error: 0, warning: 3, info: 12 } })).toBe(
      "Compiled 67 files in 0.45s — 0 errors, 0 warnings, 0 notes" +
        " (12 notes, 3 warnings hidden; run with --report-level info to list)",
    );
  });

  it("asks for warning, not info, when only warnings were withheld", () => {
    expect(summary({ suppressed: { error: 0, warning: 3, info: 0 } })).toBe(
      "Compiled 67 files in 0.45s — 0 errors, 0 warnings, 0 notes" +
        " (3 warnings hidden; run with --report-level warning to list)",
    );
  });

  it("adds no suffix when the level withheld nothing", () => {
    expect(summary({ counts: { error: 0, warning: 0, info: 4 } })).not.toContain("hidden");
  });
});
