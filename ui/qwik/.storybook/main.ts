// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

const config = createStorybookConfig({
  framework: "storybook-framework-qwik",
  componentPackage: "@inkline/qwik",
  sourceEntry: resolve(import.meta.dirname, "..", ".inkline", "index.ts"),
  stories: ["../.inkline/**/*.stories.ts"],
});

// Qwik's `manualChunks` names each `.inkline/**` segment by its path from the package root, like
// `../.inkline/components/badge/headless/IBadgeBase.tsx_entry_IBadgeBase`. Rolldown rejects a chunk
// name that is a relative path, so the static build fails. This plugin runs after Qwik's and turns
// the name into a flat one.
const flattenChunkNames = {
  name: "inkline:flatten-qwik-chunk-names",
  enforce: "post",
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
    return { ...next, plugins: [...(next.plugins ?? []), flattenChunkNames] };
  },
};
