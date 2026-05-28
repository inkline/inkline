import { defineConfig } from "@inkline/compiler";

export default defineConfig({
  srcDir: "src",
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
});
