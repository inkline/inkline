// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

export default createStorybookConfig({
  framework: "@storybook/svelte-vite",
  componentPackage: "@inkline/svelte",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
});
