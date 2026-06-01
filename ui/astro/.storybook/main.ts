// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";
import styleframe from "styleframe/plugin/vite";

const componentsDir = resolve(import.meta.dirname, "..", "..", "components");

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

export default createStorybookConfig({
  framework: "@storybook-astro/framework",
  componentPackage: "@inkline/astro",
  sourceEntry: resolve(import.meta.dirname, "..", ".inkline", "index.ts"),
  stories: ["../.inkline/**/*.stories.ts"],
  frameworkOptions: { integrations: [styleframeIntegration] },
});
