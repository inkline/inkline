import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: { index: "generated/index.ts" },
    deps: { neverBundle: [/\.astro$/] },
    copy: [{ from: "generated/*.astro", to: "dist/" }],
  },
});
