import {
  ALL_SEVERITIES,
  meetsLevel,
  type Diagnostic,
  type DiagnosticSeverity,
} from "@inkline/compiler";
import { formatDiagnostic } from "./diagnostics.ts";

/** How many diagnostics were reported, per severity. */
export type SeverityCounts = Record<DiagnosticSeverity, number>;

/**
 * Identity of a finding: the same code saying the same thing at the same source position is one thing
 * to fix, however many codegen targets noticed it. Build-invariant advisories are pushed once per
 * target with the component's own location — INK0068 from both the Angular and the Qwik emitter, for
 * instance — so a component compiled for both prints the byte-identical line twice today. The author
 * has a single call site to change, so they get a single line.
 *
 * The title is part of the key because some codes carry their payload there rather than in the
 * position: INK0090 reports every plugin failure at `<unknown>:0:0`, and INK0100 reports a per-target
 * emit failure at the component's location once per target. Two plugins crashing, or two targets
 * failing differently on one component, are distinct findings sharing a code and a position — the
 * title is the only thing that tells them apart.
 */
function identity(d: Diagnostic): string {
  return [d.code, d.loc.file, d.loc.line, d.loc.column, d.title].join("\u0000");
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
   *
   * Returns whether this batch contained an error, so a caller reporting per compiled file can count
   * the ones that failed without re-walking the list with its own copy of the severity check.
   */
  report(diagnostics: readonly Diagnostic[], sources?: SourceMap): boolean;
  /** True once any `error` diagnostic has been seen — including filtered and duplicate ones. */
  readonly hasError: boolean;
  readonly counts: SeverityCounts;
  /**
   * Distinct findings withheld by the reporting level, per severity. Deduplicated on the same key as
   * {@link counts}, so the two are comparable: `2 notes hidden` means two things to fix, not two
   * lines that would have printed.
   *
   * Kept because the level makes {@link counts} an under-report — `0 notes` alone cannot distinguish
   * "there were none" from "you asked not to see them".
   */
  readonly suppressed: SeverityCounts;
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
  const suppressed: SeverityCounts = { error: 0, warning: 0, info: 0 };
  let hasError = false;

  return {
    report(diagnostics, sources) {
      let batchHasError = false;

      for (const d of diagnostics) {
        // Exit status is decided before filtering and deduplication: an error hidden by the
        // reporting level, or repeated by a second target, is still a failed build.
        if (d.severity === "error") {
          hasError = true;
          batchHasError = true;
        }

        // Deduplicated before the level is applied, not after, so `suppressed` counts distinct
        // findings the same way `counts` does. Marking a withheld finding as seen cannot cost it a
        // later print: the level is fixed for the reporter's life, so it would be withheld again.
        const key = identity(d);
        if (seen.has(key)) continue;
        seen.add(key);

        if (!meetsLevel(d.severity, level)) {
          suppressed[d.severity]++;
          continue;
        }

        counts[d.severity]++;
        print(formatDiagnostic(d, { source: sources?.get(d.loc.file) }));
      }

      return batchHasError;
    },
    get hasError() {
      return hasError;
    },
    get counts() {
      return counts;
    },
    get suppressed() {
      return suppressed;
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

export interface BuildSummary {
  /** Files the glob matched, i.e. files the build attempted. */
  readonly matched: number;
  /**
   * Files that compiled without an error. Reported separately from {@link matched} because they can
   * differ: the build attempts every matched file and writes what each one produced, so a file that
   * raised an error still went through the loop. Counting it as compiled overstates what the build
   * delivered, which is the reading a summary line must never invite.
   */
  readonly compiled: number;
  readonly elapsedMs: number;
  /** Findings printed, per severity. */
  readonly counts: SeverityCounts;
  /** Findings withheld by the reporting level, per severity. */
  readonly suppressed: SeverityCounts;
}

/**
 * The reporting level makes `counts` a partial answer, so a summary that printed it alone would read
 * as `0 notes` on a build that found twelve and was told not to show them. Name what was withheld and
 * the flag that reveals it — the lowest withheld severity, which is the least the reader has to ask
 * for to see everything.
 */
function formatWithheld(suppressed: SeverityCounts): string {
  const withheld = ALL_SEVERITIES.filter((severity) => suppressed[severity] > 0);
  if (withheld.length === 0) return "";

  // `ALL_SEVERITIES` is ordered low → high, so the first entry is the level to ask for.
  const lowest = withheld[0]!;
  const list = withheld
    .map((severity) => pluralize(suppressed[severity], SEVERITY_NOUN[severity]))
    .join(", ");

  return ` (${list} hidden; run with --report-level ${lowest} to list)`;
}

/** One closing line per build, e.g. `Compiled 67 files in 0.45s — 0 errors, 0 warnings, 4 notes`. */
export function formatBuildSummary(summary: BuildSummary): string {
  const { matched, compiled, elapsedMs, counts, suppressed } = summary;

  // `65 of 67 files` only when they disagree: a clean build should not pay for the distinction with a
  // clumsier line, and `67 of 67` invites the reader to look for the missing two.
  const files =
    compiled === matched
      ? pluralize(matched, "file")
      : `${compiled} of ${pluralize(matched, "file")}`;
  const bySeverity = (["error", "warning", "info"] as const)
    .map((severity) => pluralize(counts[severity], SEVERITY_NOUN[severity]))
    .join(", ");
  const elapsed = (elapsedMs / 1000).toFixed(2);

  return `Compiled ${files} in ${elapsed}s — ${bySeverity}${formatWithheld(suppressed)}`;
}
