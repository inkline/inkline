import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";
import vue from "@vitejs/plugin-vue";

export default createStorybookConfig({
  framework: "@storybook/vue3-vite",
  componentPackage: "@inkline/vue",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
  vitePlugins: [vue()],
});
