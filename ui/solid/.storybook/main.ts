// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

export default createStorybookConfig({
  framework: "storybook-solidjs-vite",
  componentPackage: "@inkline/solid",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
});
