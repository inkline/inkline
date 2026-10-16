// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

const config = createStorybookConfig({
  framework: "storybook-framework-qwik",
  componentPackage: "@inkline/qwik",
  sourceEntry: resolve(import.meta.dirname, "..", ".inkline", "index.ts"),
  stories: ["../.inkline/**/*.stories.ts"],
});

// Two fixes to Qwik's Vite plugin for the static build. Both run after Qwik's plugin.
//
// Qwik's `manualChunks` names each `.inkline/**` segment by its path from the package root, like
// `../.inkline/components/badge/headless/IBadgeBase.tsx_entry_IBadgeBase`. Rolldown rejects a chunk
// name that is a relative path, so the build fails. `outputOptions` turns the name into a flat one.
//
// Vite 8 inserts its `__VITE_PRELOAD__` markers in `native:import-analysis-build` and replaces them
// in `vite:build-import-analysis`. Qwik's `configResolved` removes only the second, so the markers
// stay in the chunks and every story throws `__VITE_PRELOAD__ is not defined`. `configResolved`
// removes the first too, whenever Qwik has removed the second.
const qwikBuildFixes = {
  name: "inkline:qwik-storybook-build",
  enforce: "post",
  configResolved(resolved) {
    const { plugins } = resolved;
    if (plugins.some((plugin) => plugin.name === "vite:build-import-analysis")) return;
    const index = plugins.findIndex((plugin) => plugin.name === "native:import-analysis-build");
    if (index >= 0) plugins.splice(index, 1);
  },
  outputOptions(options) {
    const { manualChunks } = options;
    if (typeof manualChunks !== "function") return options;
    return {
      ...options,
      manualChunks: (id, meta) =>
        manualChunks(id, meta)
          ?.replace(/^\.\.\//, "")
          .replace(/\//g, "-"),
    };
  },
};

export default {
  ...config,
  async viteFinal(viteConfig, context) {
    const next = await config.viteFinal(viteConfig, context);
    return { ...next, plugins: [...(next.plugins ?? []), qwikBuildFixes] };
  },
};
