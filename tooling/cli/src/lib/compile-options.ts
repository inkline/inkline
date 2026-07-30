import {
  ALL_SEVERITIES,
  createDiagnosticCollector,
  InklineConfigError,
  isDiagnosticSeverity,
  type DiagnosticSeverity,
  type InklineConfig,
  type SourceMapMode,
  type TargetName,
} from "@inkline/compiler";

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
 * What {@link buildCompileOptions} actually returns: a `Partial<InklineConfig>` in which the four
 * fields it always takes from {@link CompileOptionOverrides} are known to be present.
 *
 * The narrowing is read off the function body, not assumed — those four are assigned unconditionally
 * from a required override. Stating it in the type is what lets a consumer read `options.outDir`
 * directly instead of re-deriving it with a second `?? fallback` that could disagree with the value
 * the compiler was handed.
 */
export type CompileOptions = Partial<InklineConfig> &
  Pick<CompileOptionOverrides, "targets" | "outDir" | "sourceMap" | "verbose">;

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
): CompileOptions {
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

/**
 * Config-time failures carry no source position. `formatDiagnostic` drops the location prefix for
 * `<unknown>` rather than printing `<unknown>:0:0`, which is what the config validator relies on too.
 */
const CONFIG_LOCATION = { file: "<unknown>", line: 0, column: 0, offset: 0, length: 0 };

/**
 * Built through the public collector rather than a hand-written `Diagnostic`, so the code, help text
 * and docs URL come from the catalog — the same reason `validateConfig` uses it.
 */
function invalidReportLevel(level: string): InklineConfigError {
  const diagnostics = createDiagnosticCollector();
  diagnostics.push("INK0087", CONFIG_LOCATION, { level, levels: ALL_SEVERITIES.join(", ") });

  return new InklineConfigError(diagnostics.freeze()[0]!);
}

/**
 * Flag > config > the caller's per-mode default, matching `--target`, `--out-dir` and `--source-map`.
 *
 * The default is a parameter rather than a constant here because it is the one thing about a
 * reporting level that is not a user setting: `compile` reports from a different floor in `--watch`
 * than in a one-shot build, and only the command knows which it is.
 *
 * Whichever value is used is validated first. An unrecognised level must not reach `meetsLevel`,
 * which ranks it as `undefined` and therefore suppresses every diagnostic — a silent, total loss of
 * output. It throws {@link InklineConfigError} so the caller reports it through `reportConfigError`
 * like an unknown `--target`, rather than a stack trace through compiler internals.
 */
export function resolveReportLevel(
  flag: string | undefined,
  fileConfig: Partial<InklineConfig>,
  fallback: DiagnosticSeverity,
): DiagnosticSeverity {
  const raw = flag ?? fileConfig.reportLevel;
  if (raw === undefined) return fallback;
  if (!isDiagnosticSeverity(raw)) throw invalidReportLevel(String(raw));

  return raw;
}
