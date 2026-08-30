import { loadConfig } from "@inkline/config-loader";
import type { InklineConfig } from "@inkline/compiler";
import { validateConfig } from "./config-schema.ts";
import { formatDiagnostic } from "./diagnostics.ts";

export interface LoadedConfig {
  readonly config: Partial<InklineConfig>;
  /**
   * `false` when a recognised key holds a value of the wrong type, which makes the whole config
   * unusable: the commands map every recognised key into the compile options, so there is no
   * "consume the good half" path. Unknown keys do not clear this flag — they are ignored, not
   * consumed. Callers must stop when this is `false`; see `reportUnusableConfig`.
   */
  readonly valid: boolean;
}

/**
 * Loads and validates the config file.
 *
 * This is the only place a config is turned into values the commands consume, which makes it the
 * only place a shape check belongs. Everything downstream — `resolveTargets`, `buildCompileOptions`,
 * the barrel and `srcDir` handling in `compile` — reads fields off the config as their declared
 * types, so a wrong-typed value that gets past here surfaces as a `TypeError` mid-run rather than a
 * diagnostic. Validating here fixes all of those consumers at once; hardening them individually
 * would be one type guard per field per command, forever.
 */
export async function loadInklineConfig(configFile?: string): Promise<LoadedConfig> {
  try {
    const { config, configFile: resolvedFile } = await loadConfig<Partial<InklineConfig>>({
      configFile,
    });

    let valid = true;
    for (const d of validateConfig(config, resolvedFile)) {
      if (d.severity === "error") {
        valid = false;
        console.error(formatDiagnostic(d));
      } else {
        console.warn(formatDiagnostic(d));
      }
    }

    return { config, valid };
  } catch (err) {
    console.error(`Failed to load config: ${err instanceof Error ? err.message : String(err)}`);
    // The empty config is itself consumable — the commands fall back to their defaults — so this is
    // not the unusable-config case the `valid` flag reports.
    return { config: {}, valid: true };
  }
}
