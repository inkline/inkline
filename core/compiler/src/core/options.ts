import { ALL_TARGETS, type TargetName, type TargetRegistry } from "../codegen/context.ts";
import { builtinRegistry } from "../codegen/registry.ts";
import { UNKNOWN_LOCATION } from "../ir/types.ts";
import { createDiagnostic } from "./diagnostics/create.ts";
import { InklineConfigError } from "./diagnostics/error.ts";
import { suggestClosest } from "./suggest.ts";
import type { DiagnosticSeverity } from "./diagnostics/codes.ts";
import type { Plugin } from "../plugin/types.ts";

export type SourceMapMode = "external" | "inline" | "none";

/**
 * Declarative description of a generated re-export barrel. Components are routed to a barrel by
 * matching a directory segment of their source path (`components/<name>/<match>/…`), so the same
 * source can be split into multiple per-category entry points (e.g. styled vs headless vs stories).
 */
export interface BarrelGroup {
  /** Output file written at each target's output root, relative to it (e.g. `"headless.ts"`). */
  readonly file: string;
  /**
   * Path segment that assigns a compiled file to this barrel (e.g. `"styled"`, `"headless"`).
   * The empty string `""` is the legacy sentinel: it matches any directory that is not a story dir.
   */
  readonly match: string;
  /**
   * Re-export shape:
   * - `"named"` (default): per-component named/default export (target-aware), sourced from compiled components.
   * - `"namespace"`: `export * as <Name>Stories from …`, sourced from the generated `*.stories.ts` modules.
   */
  readonly mode?: "named" | "namespace";
}

export interface InklineConfig {
  readonly targets: readonly TargetName[];
  readonly srcDir?: string;
  readonly outDir?: string;
  readonly targetOutDir?: Partial<Record<TargetName, string>>;
  readonly sourceMap?: SourceMapMode;
  readonly targetOptions?: Partial<Record<TargetName, Record<string, unknown>>>;
  readonly plugins?: readonly Plugin[];
  readonly verbose?: boolean;
  readonly registry?: TargetRegistry;
  /**
   * Per-category re-export barrels written for each target. Consumed by `@inkline/cli` only — the
   * compiler pipeline ignores this field. When omitted, the CLI writes a single `index.ts` barrel
   * containing every non-story component (the legacy default).
   */
  readonly barrels?: readonly BarrelGroup[];
  /**
   * Minimum severity a diagnostic must reach to be printed. Consumed by `@inkline/cli` only — the
   * compiler pipeline always produces every diagnostic and never filters, so this changes what a
   * build *reports*, never what it *finds*: the exit status is decided before the level applies.
   *
   * Omitted, the CLI keeps its own per-mode defaults; `--report-level` overrides this.
   */
  readonly reportLevel?: DiagnosticSeverity;
  /**
   * Path to a `tsconfig.json` whose ambient type declarations (e.g. generated
   * `*.d.ts` augmenting virtual modules) are loaded into the per-file TypeScript
   * program, so `import type` from those modules resolves during prop analysis.
   * Inkline's own compiler options (jsx, jsxImportSource, …) are always forced on top.
   */
  readonly tsconfig?: string;
}

export interface ResolvedCompilerOptions {
  readonly targets: readonly TargetName[];
  readonly srcDir?: string;
  readonly outDir: string;
  readonly targetOutDir: Readonly<Partial<Record<TargetName, string>>>;
  readonly sourceMap: SourceMapMode;
  readonly targetOptions: Readonly<Partial<Record<TargetName, Readonly<Record<string, unknown>>>>>;
  readonly plugins: readonly Plugin[];
  readonly verbose: boolean;
  readonly registry: TargetRegistry;
  readonly tsconfig?: string;
}

/**
 * Validate and default a user config. Config-time failures are user input, not compiler bugs, so
 * they throw {@link InklineConfigError} carrying a catalog diagnostic (code, help, docs URL) that
 * the CLI formats like any other diagnostic. There is no source position to point at, hence
 * {@link UNKNOWN_LOCATION}.
 */
export function resolveOptions(
  userConfig: Partial<InklineConfig> | undefined,
): ResolvedCompilerOptions {
  const config = userConfig ?? {};
  const availableTargets = ALL_TARGETS.join(", ");

  const targets = config.targets ?? [];
  if (targets.length === 0) {
    throw new InklineConfigError(
      createDiagnostic("INK0084", UNKNOWN_LOCATION, { targets: availableTargets }),
    );
  }

  for (const target of targets) {
    if (ALL_TARGETS.includes(target)) continue;
    const closest = suggestClosest(target, ALL_TARGETS);
    throw new InklineConfigError(
      createDiagnostic("INK0085", UNKNOWN_LOCATION, {
        target,
        targets: availableTargets,
        suggestion: closest ? `Did you mean "${closest}"? ` : "",
      }),
    );
  }

  const registry = config.registry ?? builtinRegistry;

  for (const target of targets) {
    if (registry.has(target)) continue;
    throw new InklineConfigError(
      createDiagnostic("INK0086", UNKNOWN_LOCATION, {
        target,
        available: registry.list().join(", ") || "(none)",
      }),
    );
  }

  return {
    targets,
    srcDir: config.srcDir,
    outDir: config.outDir ?? "dist",
    targetOutDir: config.targetOutDir ?? {},
    sourceMap: config.sourceMap ?? "external",
    targetOptions: config.targetOptions ?? {},
    plugins: config.plugins ?? [],
    verbose: config.verbose ?? false,
    registry,
    tsconfig: config.tsconfig,
  };
}
