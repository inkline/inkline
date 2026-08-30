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
  // Astro ships through `vp pack`, which never runs Vite plugins — so the styleframe
  // plugin cannot extract the stylesheet there the way it does for the other four
  // frameworks. `vp build` runs first over a CSS-only entry to produce the stylesheet,
  // and `pack.copy` below lifts it into `dist/index.css`.
  build: {
    outDir: ".styleframe/css",
    lib: {
      entry: { css: "./src/css.ts" },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: "index",
    },
  },
  pack: {
    entry: {
      index: "./.inkline/index.ts",
      headless: "./.inkline/headless.ts",
      stories: "./.inkline/stories.ts",
    },
    deps: { neverBundle: [/\.astro$/, /^@inkline\//, /^@storybook-astro\//] },
    copy: [
      { from: "./.inkline/*.astro", to: "dist/" },
      { from: "./.styleframe/css/index.css", to: "dist/" },
    ],
  },
});
