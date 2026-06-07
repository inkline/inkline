import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import styleframe from "styleframe/plugin/vite";

export default defineConfig({
  plugins: [
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  pack: {
    entry: {
      index: "./.inkline/index.ts",
      headless: "./.inkline/headless.ts",
      stories: "./.inkline/stories.ts",
    },
    deps: { neverBundle: [/\.astro$/, /^@inkline\//, /^@storybook-astro\//] },
    copy: [{ from: "./.inkline/*.astro", to: "dist/" }],
  },
});
