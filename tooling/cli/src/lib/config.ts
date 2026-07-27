import { loadConfig } from "@inkline/config-loader";
import { validateConfigKeys, type InklineConfig } from "@inkline/compiler";
import { formatDiagnostic } from "./diagnostics.ts";

export async function loadInklineConfig(configFile?: string): Promise<Partial<InklineConfig>> {
  try {
    const { config, configFile: resolvedFile } = await loadConfig<Partial<InklineConfig>>({
      configFile,
    });

    for (const d of validateConfigKeys(config, resolvedFile)) {
      console.warn(formatDiagnostic(d));
    }

    return config;
  } catch (err) {
    console.error(`Failed to load config: ${err instanceof Error ? err.message : String(err)}`);
    return {};
  }
}
