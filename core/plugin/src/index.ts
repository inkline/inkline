import { readFileSync } from "node:fs";
import {
  compileIncremental,
  createIncrementalState,
  type IncrementalState,
  type InklineConfig,
  type TargetName,
} from "@inkline/compiler";
import { createUnplugin, type UnpluginFactory } from "unplugin";

export interface InklinePluginOptions {
  readonly target?: TargetName;
  readonly sourceMap?: boolean;
  readonly config?: Partial<InklineConfig>;
}

const INK_RE = /\.ink\.tsx$/;

export const unpluginFactory: UnpluginFactory<InklinePluginOptions | undefined> = (
  options = {},
) => {
  let resolvedTarget = options?.target;
  let state: IncrementalState = createIncrementalState();

  return {
    name: "@inkline/plugin",
    enforce: "pre",

    transform: {
      filter: { id: INK_RE },
      async handler(code, id) {
        const target = resolvedTarget;
        if (!target) {
          this.error(
            'No target specified. Set the "target" option or use the Vite plugin for auto-detection.',
          );
          return null;
        }

        const compilerConfig: Partial<InklineConfig> = {
          ...options?.config,
          targets: [target],
          sourceMap: options?.sourceMap === false ? "none" : "inline",
        };

        const result = await compileIncremental(
          state,
          [{ fileName: id, source: code }],
          compilerConfig,
        );
        state = result.nextState;

        for (const d of result.diagnostics) {
          if (d.severity === "error") {
            this.error(`${d.code}: ${d.title}`);
          } else if (d.severity === "warning") {
            this.warn(`${d.code}: ${d.title}`);
          }
        }

        const files = result.files[target];
        if (!files || files.length === 0) return null;

        const mainFile = files.find(
          (f: { path: string }) => !f.path.endsWith(".css") && !f.path.endsWith(".map"),
        );
        if (!mainFile) return null;

        return {
          code: mainFile.contents,
          map: mainFile.sourceMap ? JSON.parse(mainFile.sourceMap) : null,
        };
      },
    },

    vite: {
      configResolved(config: { plugins: readonly { name: string }[] }) {
        if (resolvedTarget) return;
        const names = config.plugins.map((p) => p.name);
        if (names.some((n) => n.includes("react"))) resolvedTarget = "react";
        else if (names.some((n) => n.includes("solid"))) resolvedTarget = "solid";
        else if (names.some((n) => n.includes("vue"))) resolvedTarget = "vue";
        else if (names.some((n) => n.includes("svelte"))) resolvedTarget = "svelte";
        else resolvedTarget = "react";
      },

      async handleHotUpdate(ctx: { file: string }) {
        if (!INK_RE.test(ctx.file)) return;
        const source = readFileSync(ctx.file, "utf-8");
        const target = resolvedTarget;
        if (!target) return;

        const result = await compileIncremental(state, [{ fileName: ctx.file, source }], {
          ...options?.config,
          targets: [target],
          sourceMap: "inline",
        });
        state = result.nextState;
      },
    },
  };
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
