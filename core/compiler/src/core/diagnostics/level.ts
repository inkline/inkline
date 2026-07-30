import type { DiagnosticSeverity } from "./codes.ts";

/** Severity ordering, low → high. A reporting level filters out anything below it. */
const SEVERITY_RANK: Record<DiagnosticSeverity, number> = { info: 0, warning: 1, error: 2 };

/**
 * Every severity, low → high: the runtime counterpart of the {@link DiagnosticSeverity} union, in
 * reporting-level order.
 *
 * Derived from {@link SEVERITY_RANK} rather than restated beside it. That map is keyed by the union,
 * so a new severity cannot be added without failing typecheck there — which makes it the one place
 * the set is declared. Sorted by rank rather than trusted to key order, so reordering the literal
 * cannot silently reorder this.
 */
export const ALL_SEVERITIES: readonly DiagnosticSeverity[] = (
  Object.keys(SEVERITY_RANK) as DiagnosticSeverity[]
).sort((a, b) => SEVERITY_RANK[a] - SEVERITY_RANK[b]);

/**
 * Whether a string names a severity. A reporting level arrives from a CLI flag or a config file, so
 * it has to be checked before it reaches {@link meetsLevel} — an unrecognised level would rank as
 * `undefined` there and silently suppress every diagnostic.
 *
 * `Object.hasOwn`, not `in`: the latter walks the prototype chain, so `--report-level toString` would
 * pass the check and then rank as `undefined` anyway — the exact failure this guards.
 */
export function isDiagnosticSeverity(value: unknown): value is DiagnosticSeverity {
  return typeof value === "string" && Object.hasOwn(SEVERITY_RANK, value);
}

/** True when `severity` is at or above the minimum reporting `level`. */
export function meetsLevel(severity: DiagnosticSeverity, level: DiagnosticSeverity): boolean {
  return SEVERITY_RANK[severity] >= SEVERITY_RANK[level];
}
