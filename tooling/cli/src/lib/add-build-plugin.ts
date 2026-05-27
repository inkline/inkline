import { loadFile, writeFile } from "magicast";
import { addVitePlugin } from "magicast/helpers";
import type { Bundler } from "./detect-bundler.ts";
import type { Framework } from "./detect-framework.ts";

const pluginImportMap: Record<Bundler, string> = {
  vite: "inkline/plugin/vite",
  webpack: "inkline/plugin/webpack",
  rollup: "inkline/plugin/rollup",
};

export async function addBuildPlugin(
  configPath: string,
  bundler: Bundler,
  framework: Framework,
): Promise<void> {
  const mod = await loadFile(configPath);

  if (bundler === "vite") {
    addVitePlugin(mod, {
      from: pluginImportMap.vite,
      constructor: "inkline",
    });
  } else {
    addVitePlugin(mod, {
      from: pluginImportMap[bundler],
      constructor: "inkline",
      options: { target: framework },
    });
  }

  await writeFile(mod, configPath);
}

export function getManualPluginInstructions(bundler: Bundler, framework: Framework): string {
  const importPath = pluginImportMap[bundler];
  const optionsStr = bundler === "vite" ? "" : `{ target: "${framework}" }`;

  return [
    `Add the Inkline plugin to your ${bundler} config:`,
    "",
    `  import inkline from "${importPath}";`,
    "",
    `  // Add to your plugins array:`,
    `  inkline(${optionsStr})`,
  ].join("\n");
}
