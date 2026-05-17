import { resolve } from "node:path";
import { createStorybookConfig } from "@inkline/storybook/preset/main";
import react from "@vitejs/plugin-react";

export default createStorybookConfig({
  framework: "@storybook/react-vite",
  componentPackage: "@inkline/react",
  sourceEntry: resolve(import.meta.dirname, "..", "generated", "index.ts"),
  vitePlugins: [react()],
});
