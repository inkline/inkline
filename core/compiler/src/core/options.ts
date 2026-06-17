import { ALL_TARGETS, type TargetName, type TargetRegistry } from "../codegen/context.ts";
import { builtinRegistry } from "../codegen/registry.ts";
import type { AngularRegistry } from "../codegen/targets/angular/registry.ts";
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
   * Path to a `tsconfig.json` whose ambient type declarations (e.g. generated
   * `*.d.ts` augmenting virtual modules) are loaded into the per-file TypeScript
   * program, so `import type` from those modules resolves during prop analysis.
   * Inkline's own compiler options (jsx, jsxImportSource, …) are always forced on top.
   */
  readonly tsconfig?: string;
  /**
   * Angular-only whole-program component registry (component name → host tag / kind / attribute
   * chain), built by a pre-pass over all components and consumed by the Angular target's
   * attribute-selector codegen. Ignored by every other target. Built via `buildAngularRegistry`.
   */
  readonly angularRegistry?: AngularRegistry;
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
  readonly angularRegistry?: AngularRegistry;
}

export function resolveOptions(
  userConfig: Partial<InklineConfig> | undefined,
): ResolvedCompilerOptions {
  const config = userConfig ?? {};

  const targets = config.targets ?? [];
  if (targets.length === 0) {
    throw new Error("At least one target is required");
  }

  for (const t of targets) {
    if (!ALL_TARGETS.includes(t)) {
      throw new Error(`Unknown target: "${t}"`);
    }
  }

  const registry = config.registry ?? builtinRegistry;

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
    angularRegistry: config.angularRegistry,
  };
}
