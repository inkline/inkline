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
    // The compiler emits .astro files nested under .inkline/components/<name>/<layer>/ and the
    // generated barrels import them by that exact path, so the copy must recurse and preserve the
    // tree — `flatten` defaults to true, which would collapse every file into dist/.
    copy: [{ from: "./.inkline/**/*.astro", to: "dist", flatten: false }],
  },
});
