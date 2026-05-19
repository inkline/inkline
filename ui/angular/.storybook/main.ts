// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

export default createStorybookConfig({
  framework: "@analogjs/storybook-angular",
  componentPackage: "@inkline/angular",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
  frameworkOptions: {
    tsconfig: resolve(import.meta.dirname, "..", "tsconfig.storybook.json"),
  },
});
