import {
  InklineConfigError,
  createDiagnosticCollector,
  meetsLevel,
  type Diagnostic,
  type DiagnosticSeverity,
  type InklineConfig,
  type SourceLocation,
} from "@inkline/compiler";
import { formatDiagnostic } from "./diagnostics.ts";

/** How many diagnostics were reported, per severity. */
export type SeverityCounts = Record<DiagnosticSeverity, number>;

/** `info` is the compiler's severity; "note" is what it is called to the person reading the build. */
const SEVERITY_NOUN: Record<DiagnosticSeverity, string> = {
  error: "error",
  warning: "warning",
  info: "note",
};

/**
 * The accepted `--report-level` values, highest severity first.
 *
 * Derived from {@link SEVERITY_NOUN} rather than restated: that record is total over
 * `DiagnosticSeverity`, so a new severity cannot be added to the union without appearing here and in
 * the summary's vocabulary at the same time.
 */
export const REPORT_LEVELS = Object.keys(SEVERITY_NOUN) as readonly DiagnosticSeverity[];

/** A config-time failure has no source position to point at; `formatDiagnostic` drops the prefix. */
const NO_LOCATION: SourceLocation = { file: "<unknown>", line: 0, column: 0, offset: 0, length: 0 };

function isReportLevel(value: string): value is DiagnosticSeverity {
  return (REPORT_LEVELS as readonly string[]).includes(value);
}

/**
 * Flag > config > default, matching `--target`, `--src-dir` and `--out-dir`. The default is the
 * caller's, not this function's: a one-shot build reports from `info` and `--watch` from `warning`
 * (`info` notices like INK0045 are build-time advisories, not something to re-read on every save).
 *
 * An unusable value throws {@link InklineConfigError} carrying INK0087, so a mistyped level lands on
 * the same path as a mistyped `--target` — a formatted diagnostic with help and a docs URL, not a
 * stack trace through bundled compiler internals. It is not silently coerced to the default either:
 * `--report-level waring` means the author wanted something specific and did not get it.
 */
export function resolveReportLevel(
  flag: string | undefined,
  fileConfig: Partial<InklineConfig>,
  fallback: DiagnosticSeverity,
): DiagnosticSeverity {
  const raw = flag ?? fileConfig.reportLevel;
  if (raw === undefined) return fallback;

  if (typeof raw !== "string" || !isReportLevel(raw)) {
    const diagnostics = createDiagnosticCollector();
    diagnostics.push("INK0087", NO_LOCATION, {
      level: String(raw),
      levels: REPORT_LEVELS.join(", "),
    });
    throw new InklineConfigError(diagnostics.freeze()[0]!);
  }

  return raw;
}

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
   */
  report(diagnostics: readonly Diagnostic[], sources?: SourceMap): void;
  /** True once any `error` diagnostic has been seen — including filtered and duplicate ones. */
  readonly hasError: boolean;
  /** Distinct findings printed, per severity. */
  readonly counts: SeverityCounts;
  /**
   * Distinct findings found but *not* printed because the reporting level withheld them. Deduplicated
   * on the same identity as {@link counts}, so the two are directly comparable: a summary that says
   * `0 notes` alongside `3 notes withheld` is describing the same three findings once each.
   */
  readonly withheld: SeverityCounts;
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
  const withheld: SeverityCounts = { error: 0, warning: 0, info: 0 };
  let hasError = false;

  return {
    report(diagnostics, sources) {
      for (const d of diagnostics) {
        // Exit status is decided before filtering and deduplication: an error hidden by the
        // reporting level, or repeated by a second target, is still a failed build.
        if (d.severity === "error") hasError = true;

        // Deduplicate before filtering, not after: a finding's severity comes from its code, so
        // every instance of one identity filters the same way and the printed output is unchanged
        // either way. Doing it in this order is what makes `withheld` a count of *findings*
        // suppressed rather than of duplicate mentions of them.
        const key = identity(d);
        if (seen.has(key)) continue;
        seen.add(key);

        if (!meetsLevel(d.severity, level)) {
          withheld[d.severity]++;
          continue;
        }

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
    get withheld() {
      return withheld;
    },
  };
}

function pluralize(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function describeCounts(counts: SeverityCounts, only: (count: number) => boolean): string {
  return REPORT_LEVELS.filter((severity) => only(counts[severity]))
    .map((severity) => pluralize(counts[severity], SEVERITY_NOUN[severity]))
    .join(", ");
}

export interface BuildSummary {
  /** Files that compiled without an error, not files the glob matched. See {@link formatBuildSummary}. */
  readonly compiledCount: number;
  readonly elapsedMs: number;
  /** The level the build resolved to, named in the suffix so the reader knows what to raise. */
  readonly level: DiagnosticSeverity;
  readonly counts: SeverityCounts;
  readonly withheld: SeverityCounts;
}

/**
 * One closing line per build, e.g. `Compiled 67 files in 0.45s — 0 errors, 0 warnings, 4 notes`.
 *
 * `compiledCount` is files that compiled, not files matched. The line used to report the size of the
 * glob, which meant a build with a failing file said it had compiled it; a count that disagrees with
 * the errors printed directly above it teaches the reader to ignore the line.
 *
 * When the resolved level withheld anything, the counts alone are a half-truth — `0 notes` reads as
 * "clean" when it can equally mean "not looked at" — so the withheld findings are named along with
 * the level that hid them and the flag that reveals them.
 */
export function formatBuildSummary(summary: BuildSummary): string {
  const bySeverity = describeCounts(summary.counts, () => true);
  const elapsed = (summary.elapsedMs / 1000).toFixed(2);
  const line = `Compiled ${pluralize(summary.compiledCount, "file")} in ${elapsed}s — ${bySeverity}`;

  const hidden = describeCounts(summary.withheld, (count) => count > 0);
  if (!hidden) return line;

  return `${line} (${hidden} withheld at --report-level ${summary.level}; re-run with --report-level info to list)`;
}
