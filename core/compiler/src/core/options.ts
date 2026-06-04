import { ALL_TARGETS, type TargetName, type TargetRegistry } from "../codegen/context.ts";
import { builtinRegistry } from "../codegen/registry.ts";
import type { Plugin } from "../plugin/types.ts";

export type SourceMapMode = "external" | "inline" | "none";

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
  };
}
