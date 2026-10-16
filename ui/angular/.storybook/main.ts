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

// The preset aliases `@inkline/angular` to its source only in dev, and a static build loads `dist`.
// `dist` is built without the Angular compiler, so its classes carry no input metadata, and
// `@storybook/angular` assigns each arg as a plain property, which overwrites the signal inputs
// (`ctx.disabled is not a function`). Aliasing the source in every build lets Analog's plugin
// compile the components, so the static Storybook shows the source components, not the package.
export default {
  ...config,
  async viteFinal(viteConfig, context) {
    const next = await config.viteFinal(viteConfig, context);
    return {
      ...next,
      resolve: {
        ...next.resolve,
        alias: { ...next.resolve?.alias, "@inkline/angular": sourceEntry },
      },
    };
  },
};
