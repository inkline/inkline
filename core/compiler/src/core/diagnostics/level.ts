import type { DiagnosticSeverity } from "./codes.ts";

/** Severity ordering, low → high. A reporting level filters out anything below it. */
const SEVERITY_RANK: Record<DiagnosticSeverity, number> = { info: 0, warning: 1, error: 2 };

/** True when `severity` is at or above the minimum reporting `level`. */
export function meetsLevel(severity: DiagnosticSeverity, level: DiagnosticSeverity): boolean {
  return SEVERITY_RANK[severity] >= SEVERITY_RANK[level];
}
