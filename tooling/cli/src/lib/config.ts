import { loadConfig } from "@inkline/config-loader";
import type { InklineConfig } from "@inkline/compiler";

export async function loadInklineConfig(configFile?: string): Promise<Partial<InklineConfig>> {
  try {
    const { config } = await loadConfig<Partial<InklineConfig>>({ configFile });
    return config;
  } catch (err) {
    console.error(`Failed to load config: ${err instanceof Error ? err.message : String(err)}`);
    return {};
  }
}
