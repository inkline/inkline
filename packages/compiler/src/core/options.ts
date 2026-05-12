import { ALL_TARGETS, type TargetName, type TargetRegistry } from "../codegen/context.ts";
import type { Plugin } from "../plugin/types.ts";

export type SourceMapMode = "external" | "inline" | "none";

export interface InklineConfig {
  readonly targets: readonly TargetName[];
  readonly outDir?: string;
  readonly sourceMap?: SourceMapMode;
  readonly targetOptions?: Partial<Record<TargetName, Record<string, unknown>>>;
  readonly plugins?: readonly Plugin[];
  readonly verbose?: boolean;
  readonly registry?: TargetRegistry;
}

export interface ResolvedCompilerOptions {
  readonly targets: readonly TargetName[];
  readonly outDir: string;
  readonly sourceMap: SourceMapMode;
  readonly targetOptions: Readonly<Partial<Record<TargetName, Readonly<Record<string, unknown>>>>>;
  readonly plugins: readonly Plugin[];
  readonly verbose: boolean;
  readonly registry: TargetRegistry;
}

const emptyRegistry: TargetRegistry = {
  get: () => undefined,
  has: () => false,
  list: () => [],
};

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

  const registry = config.registry ?? emptyRegistry;

  return {
    targets,
    outDir: config.outDir ?? "dist",
    sourceMap: config.sourceMap ?? "external",
    targetOptions: config.targetOptions ?? {},
    plugins: config.plugins ?? [],
    verbose: config.verbose ?? false,
    registry,
  };
}
