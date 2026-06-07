import { defineConfig } from "@inkline/compiler";

export default defineConfig({
  srcDir: "src",
  tsconfig: "./tsconfig.json",
  targets: ["react", "vue", "svelte", "solid", "angular", "qwik", "astro"],
  targetOutDir: {
    react: "../react/.inkline",
    vue: "../vue/.inkline",
    svelte: "../svelte/.inkline",
    solid: "../solid/.inkline",
    angular: "../angular/.inkline",
    qwik: "../qwik/.inkline",
    astro: "../astro/.inkline",
  },
  sourceMap: "external",
  barrels: [
    { file: "index.ts", match: "styled" },
    { file: "headless.ts", match: "headless" },
    { file: "stories.ts", match: "stories", mode: "namespace" },
  ],
});
