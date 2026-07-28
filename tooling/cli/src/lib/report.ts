import { meetsLevel, type Diagnostic, type DiagnosticSeverity } from "@inkline/compiler";
import { formatDiagnostic } from "./diagnostics.ts";

/** How many diagnostics were reported, per severity. */
export type SeverityCounts = Record<DiagnosticSeverity, number>;

/**
 * Identity of a finding: the same code at the same source position is one thing to fix, however many
 * codegen targets noticed it. Build-invariant advisories are pushed once per target with the
 * component's own location — INK0068 from both the Angular and the Qwik emitter, for instance — so a
 * component compiled for both prints the byte-identical line twice today. The author has a single
 * call site to change, so they get a single line. The same code at a different position is a
 * different finding and still prints.
 */
function identity(d: Diagnostic): string {
  return [d.code, d.loc.file, d.loc.line, d.loc.column].join("\u0000");
}

/** Source text by absolute file name, for the code frame `formatDiagnostic` renders. */
export type SourceMap = ReadonlyMap<string, string>;

export interface BuildReporter {
  /**
   * Filter by reporting level, drop repeats of an already-reported finding, print and count the rest.
   *
   * Rendering belongs to `formatDiagnostic`, not to this module: `sources` is looked up by the
   * diagnostic's file and handed straight to the formatter so it can draw its code frame. A caller
   * with no source text for that file omits it and the frame is skipped, per the formatter's own
   * contract.
   */
  report(diagnostics: readonly Diagnostic[], sources?: SourceMap): void;
  /** True once any `error` diagnostic has been seen — including filtered and duplicate ones. */
  readonly hasError: boolean;
  readonly counts: SeverityCounts;
}

/**
 * Collects a whole build's diagnostics: one reporter per compile so deduplication spans files, not
 * just the targets of a single one.
 */
export function createBuildReporter(
  level: DiagnosticSeverity,
  print: (message: string) => void = (message) => console.error(message),
): BuildReporter {
  const seen = new Set<string>();
  const counts: SeverityCounts = { error: 0, warning: 0, info: 0 };
  let hasError = false;

  return {
    report(diagnostics, sources) {
      for (const d of diagnostics) {
        // Exit status is decided before filtering and deduplication: an error hidden by the
        // reporting level, or repeated by a second target, is still a failed build.
        if (d.severity === "error") hasError = true;
        if (!meetsLevel(d.severity, level)) continue;

        const key = identity(d);
        if (seen.has(key)) continue;
        seen.add(key);

        counts[d.severity]++;
        print(formatDiagnostic(d, { source: sources?.get(d.loc.file) }));
      }
    },
    get hasError() {
      return hasError;
    },
    get counts() {
      return counts;
    },
  };
}

/** `info` is the compiler's severity; "note" is what it is called to the person reading the build. */
const SEVERITY_NOUN: Record<DiagnosticSeverity, string> = {
  error: "error",
  warning: "warning",
  info: "note",
};

function pluralize(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

/** One closing line per build, e.g. `Compiled 67 files in 0.45s — 0 errors, 0 warnings, 4 notes`. */
export function formatBuildSummary(
  fileCount: number,
  elapsedMs: number,
  counts: SeverityCounts,
): string {
  const bySeverity = (["error", "warning", "info"] as const)
    .map((severity) => pluralize(counts[severity], SEVERITY_NOUN[severity]))
    .join(", ");
  const elapsed = (elapsedMs / 1000).toFixed(2);

  return `Compiled ${pluralize(fileCount, "file")} in ${elapsed}s — ${bySeverity}`;
}
