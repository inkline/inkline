import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

export default createStorybookConfig({
  framework: "@storybook/angular",
  componentPackage: "@inkline/angular",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
});
