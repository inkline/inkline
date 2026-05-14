import { readFileSync } from "node:fs";
import {
  compileIncremental,
  createIncrementalState,
  type IncrementalState,
  type InklineConfig,
  type TargetName,
} from "@inkline/compiler";
import type { Plugin, ResolvedConfig } from "vite";

export interface InklinePluginOptions {
  readonly target?: TargetName;
  readonly include?: string | readonly string[];
  readonly sourceMap?: boolean;
  readonly config?: Partial<InklineConfig>;
}

const INK_RE = /\.ink\.tsx$/;

function detectTarget(config: ResolvedConfig): TargetName {
  const plugins = config.plugins.map((p: { name: string }) => p.name);
  if (plugins.some((n: string) => n.includes("react"))) return "react";
  if (plugins.some((n: string) => n.includes("solid"))) return "solid";
  if (plugins.some((n: string) => n.includes("vue"))) return "vue";
  if (plugins.some((n: string) => n.includes("svelte"))) return "svelte";
  return "react";
}

export default function inklinePlugin(options: InklinePluginOptions = {}): Plugin {
  let resolvedTarget: TargetName;
  let state: IncrementalState = createIncrementalState();

  return {
    name: "@inkline/vite-plugin",
    enforce: "pre",

    configResolved(config: ResolvedConfig) {
      resolvedTarget = options.target ?? detectTarget(config);
    },

    async transform(code: string, id: string) {
      if (!INK_RE.test(id)) return null;

      const target = resolvedTarget;
      const compilerConfig: Partial<InklineConfig> = {
        ...options.config,
        targets: [target],
        sourceMap: options.sourceMap === false ? "none" : "inline",
      };

      const result = await compileIncremental(
        state,
        [{ fileName: id, source: code }],
        compilerConfig,
      );
      state = result.nextState;

      for (const d of result.diagnostics) {
        if (d.severity === "error") {
          this.error({ message: `${d.code}: ${d.title}`, id });
        } else if (d.severity === "warning") {
          this.warn({ message: `${d.code}: ${d.title}`, id });
        }
      }

      const files = result.files[target];
      if (!files || files.length === 0) return null;

      const mainFile = files.find((f: { path: string }) => !f.path.endsWith(".css"));
      if (!mainFile) return null;

      return {
        code: mainFile.contents,
        map: mainFile.sourceMap ? JSON.parse(mainFile.sourceMap) : null,
      };
    },

    async handleHotUpdate(ctx) {
      const file = (ctx as { file: string }).file;
      if (!INK_RE.test(file)) return;

      const source = readFileSync(file, "utf-8");
      const target = resolvedTarget;

      const result = await compileIncremental(state, [{ fileName: file, source }], {
        ...options.config,
        targets: [target],
        sourceMap: "inline",
      });
      state = result.nextState;
    },
  };
}

export { inklinePlugin };
