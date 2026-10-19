// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";
import styleframe from "styleframe/plugin/vite";

const componentsDir = resolve(import.meta.dirname, "..", "..", "components");
const repoRoot = resolve(import.meta.dirname, "..", "..", "..");

/**
 * `@storybook-astro` renders `.astro` components through Astro's SSR container,
 * which is built with `configFile: false` — so it ignores this package's
 * `astro.config`/`vite.config`. The only supported injection point is an Astro
 * integration, so the styleframe Vite plugin (which resolves `virtual:styleframe`
 * imported by the styled components) is wired in through one here.
 */
const styleframeIntegration = {
  name: "styleframe",
  dependencies: [],
  options: {},
  renderer: {},
  resolveClient: () => undefined,
  loadIntegration: async () => ({
    name: "styleframe",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          // `@storybook-astro` prerenders the stories through a Vite dev server, where Astro's dev
          // toolbar annotates every element with `data-astro-source-file`, the absolute path of its
          // `.astro` file. Turning the toolbar off keeps the build host's paths out of the
          // published `astro-prerendered-stories.json`.
          devToolbar: { enabled: false },
          vite: {
            plugins: [
              styleframe({
                entry: resolve(componentsDir, "styleframe.config.ts"),
                include: [resolve(componentsDir, "src", "**", "*.styleframe.ts")],
              }),
            ],
          },
        });
      },
    },
  }),
};

/**
 * Astro stamps each compiled component with its absolute `moduleId`, which lands in the client
 * chunks of the static Storybook. Stripping the repo root from the chunks keeps the build host's
 * paths out of the deployed site.
 */
const stripRepoRoot = {
  name: "inkline:strip-repo-root",
  apply: "build",
  renderChunk(code) {
    return code.includes(repoRoot) ? { code: code.replaceAll(repoRoot, ""), map: null } : null;
  },
};

export default createStorybookConfig({
  framework: "@storybook-astro/framework",
  componentPackage: "@inkline/astro",
  sourceEntry: resolve(import.meta.dirname, "..", ".inkline", "index.ts"),
  stories: ["../.inkline/**/*.stories.ts"],
  frameworkOptions: { integrations: [styleframeIntegration] },
  vitePlugins: [stripRepoRoot],
});
