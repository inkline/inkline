/**
 * Position of a node in the original `.ink.tsx` source. Preserved through
 * every IR layer so source maps and error messages can point back to the
 * exact location the author wrote.
 */
export interface SourceLocation {
  file: string;
  line: number;
  column: number;
  offset: number;
  length: number;
}

/**
 * Sentinel used when a location is genuinely unknown (synthesized nodes,
 * default-filled IR collections). Frozen so consumers can't mutate it.
 */
export const UNKNOWN_LOCATION: SourceLocation = Object.freeze({
  file: "<unknown>",
  line: 0,
  column: 0,
  offset: 0,
  length: 0,
});

/**
 * Every framework target Inkline emits to. Targets live in separate
 * `@inkline/target-*` packages; the compiler only owns the name set.
 */
export type TargetName = "react" | "solid" | "vue" | "svelte" | "angular" | "qwik" | "astro";

export const ALL_TARGETS: readonly TargetName[] = Object.freeze([
  "react",
  "solid",
  "vue",
  "svelte",
  "angular",
  "qwik",
  "astro",
] as const);

export type DiagnosticSeverity = "error" | "warning" | "info";

/**
 * Compiler-level diagnostic. `targets` is omitted (or empty) when the
 * diagnostic applies to every target; populated when the issue is specific
 * to a subset (e.g. dynamic-dep fallback only matters for React).
 */
export interface Diagnostic {
  code: string;
  severity: DiagnosticSeverity;
  message: string;
  loc: SourceLocation;
  help?: string;
  /** Targets that the message applies to; empty array means all targets. */
  targets?: TargetName[];
}
