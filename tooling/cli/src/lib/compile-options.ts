import type { InklineConfig, SourceMapMode, TargetName } from "@inkline/compiler";

/**
 * Values a command resolves from its own flags before the config file is consulted. Everything else
 * in the option bag is read straight off the config, so a newly added `InklineConfig` field reaches
 * every command at once instead of only the one whose author remembered it.
 */
export interface CompileOptionOverrides {
  readonly targets: readonly TargetName[];
  readonly outDir: string;
  readonly sourceMap: SourceMapMode;
  readonly verbose: boolean;
  /** Only `compile` exposes `--src-dir`; omitted, the config value is used. */
  readonly srcDir?: string;
}

/**
 * Single source of truth for the config → `compile()` options mapping.
 *
 * `check` and `compile` must hand the compiler the same program, plugins and target options, or the
 * command that presents itself as the correctness gate sees less than the build does — `check`
 * passes on code `compile` rejects. That had already happened twice (`tsconfig`, `targetOptions`),
 * so both commands now build their options here and nowhere else.
 *
 * The map is total over {@link InklineConfig} except `barrels`, which is CLI-only and ignored by the
 * compiler pipeline.
 */
export function buildCompileOptions(
  fileConfig: Partial<InklineConfig>,
  overrides: CompileOptionOverrides,
): Partial<InklineConfig> {
  return {
    targets: overrides.targets,
    srcDir: overrides.srcDir ?? fileConfig.srcDir,
    outDir: overrides.outDir,
    targetOutDir: fileConfig.targetOutDir,
    sourceMap: overrides.sourceMap,
    targetOptions: fileConfig.targetOptions,
    plugins: fileConfig.plugins,
    verbose: overrides.verbose,
    registry: fileConfig.registry,
    tsconfig: fileConfig.tsconfig,
  };
}

/**
 * Flag > config, then parsed. An empty result is deliberately left empty rather than defaulted to a
 * target list: `resolveOptions` turns it into INK0084, so a project with no configured targets gets
 * the same clear diagnostic from every command instead of one command inventing a target set.
 */
export function resolveTargets(
  flag: string | undefined,
  fileConfig: Partial<InklineConfig>,
): TargetName[] {
  const raw = flag ?? fileConfig.targets?.join(",");
  return (raw
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean) ?? []) as TargetName[];
}

/** Flag > config > `dist`, matching `--target` and `--source-map`. */
export function resolveOutDir(
  flag: string | undefined,
  fileConfig: Partial<InklineConfig>,
): string {
  return flag ?? fileConfig.outDir ?? "dist";
}
