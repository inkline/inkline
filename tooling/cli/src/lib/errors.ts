import { isInklineConfigError } from "@inkline/compiler";
import { formatDiagnostic } from "./diagnostics.ts";

/**
 * Exit codes. `1` means the compile ran and reported errors; `2` means the CLI never got that far
 * because its input was unusable (bad flags, unusable config, no matching files).
 */
export const EXIT_COMPILE_ERROR = 1;
export const EXIT_USAGE_ERROR = 2;

/**
 * Print a configuration failure as a formatted diagnostic and set the usage exit code. The stack
 * trace runs through bundled compiler internals and says nothing about a mistyped `--target`, so it
 * is only shown under `--verbose`. Returns `false` when the error is something else, so callers
 * rethrow rather than swallow a real crash.
 */
/**
 * Stop the command after `loadInklineConfig` reported a config it cannot consume. The per-field
 * diagnostics are already on stderr; this is the line that says the run ended because of them,
 * which a list of diagnostics on its own does not.
 */
export function reportUnusableConfig(): void {
  console.error("Error: the configuration is unusable, see the diagnostics above.");
  process.exitCode = EXIT_USAGE_ERROR;
}

export function reportConfigError(error: unknown, verbose: boolean): boolean {
  if (!isInklineConfigError(error)) return false;

  console.error(formatDiagnostic(error.diagnostic));
  if (verbose && error.stack) console.error(error.stack);
  process.exitCode = EXIT_USAGE_ERROR;

  return true;
}
