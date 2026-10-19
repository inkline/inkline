// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

const sourceEntry = resolve(import.meta.dirname, "..", ".inkline", "index.ts");

const config = createStorybookConfig({
  framework: "@analogjs/storybook-angular",
  componentPackage: "@inkline/angular",
  sourceEntry,
  stories: ["../.inkline/**/*.stories.ts"],
  frameworkOptions: {
    tsconfig: resolve(import.meta.dirname, "..", "tsconfig.storybook.json"),
  },
});

// A static build loads `dist`, which holds partial Ivy declarations. Analog's build optimizer would
// link them and drop their class metadata, but `@storybook/angular` reads that metadata to build a
// story's template from its component, so every story without a template would fail with "Cannot
// read properties of undefined (reading 'selector')". Without the optimizer, the JIT compiler the
// Storybook already loads compiles the declarations at runtime and keeps the metadata.
const optimizer = "@analogjs/vite-plugin-angular-optimizer";

export default {
  ...config,
  async viteFinal(viteConfig, context) {
    const next = await config.viteFinal(viteConfig, context);
    const plugins = (next.plugins ?? []).flat(Infinity);
    if (!plugins.some((plugin) => plugin?.name === optimizer)) {
      throw new Error(`${optimizer} not found: check the @analogjs/vite-plugin-angular version`);
    }
    return { ...next, plugins: plugins.filter((plugin) => plugin?.name !== optimizer) };
  },
};
