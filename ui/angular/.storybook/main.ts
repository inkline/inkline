// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

export default createStorybookConfig({
  framework: "@analogjs/storybook-angular",
  componentPackage: "@inkline/angular",
  sourceEntry: resolve(import.meta.dirname, "..", ".inkline", "index.ts"),
  stories: ["../.inkline/**/*.stories.ts"],
  frameworkOptions: {
    tsconfig: resolve(import.meta.dirname, "..", "tsconfig.storybook.json"),
  },
});
