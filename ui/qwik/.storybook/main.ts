// @ts-nocheck
import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";

export default createStorybookConfig({
  framework: "storybook-framework-qwik",
  componentPackage: "@inkline/qwik",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
  stories: ["../generated/**/*.stories.ts"],
});
