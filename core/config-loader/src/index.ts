import { loadConfig as c12LoadConfig } from "c12";

export interface LoadConfigOptions<T> {
  /** Config file base name (without extension). Default: `"inkline"` */
  name?: string;
  /** Working directory. Default: `process.cwd()` */
  cwd?: string;
  /** Explicit config file path. Bypasses name-based search. */
  configFile?: string;
  /** Default values merged under the loaded config. */
  defaults?: Partial<T>;
}

export interface LoadConfigResult<T> {
  config: T;
  configFile?: string;
}

export async function loadConfig<T extends Record<string, unknown> = Record<string, unknown>>(
  options: LoadConfigOptions<T> = {},
): Promise<LoadConfigResult<T>> {
  const { name = "inkline", cwd, configFile, defaults } = options;

  const result = await c12LoadConfig<T>({
    name,
    cwd: cwd ?? process.cwd(),
    configFile,
    defaults: defaults as T,
    rcFile: false,
    globalRc: false,
    packageJson: false,
    dotenv: false,
  });

  return {
    config: result.config ?? (defaults as T) ?? ({} as T),
    configFile: result.configFile,
  };
}

export function defineConfig<T>(config: T): T {
  return config;
}
