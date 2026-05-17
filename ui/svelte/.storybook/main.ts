import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default createStorybookConfig({
  framework: "@storybook/svelte-vite",
  componentPackage: "@inkline/svelte",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
  vitePlugins: [svelte()],
});
