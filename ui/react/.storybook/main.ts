// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

export default createStorybookConfig({
  framework: "@storybook/react-vite",
  componentPackage: "@inkline/react",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
});
