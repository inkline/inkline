import { defineConfig } from "@inkline/compiler";

export default defineConfig({
  srcDir: "src",
  targets: ["react", "vue", "svelte", "solid", "angular", "qwik", "astro"],
  targetOutDir: {
    react: "../react/generated",
    vue: "../vue/generated",
    svelte: "../svelte/generated",
    solid: "../solid/generated",
    angular: "../angular/generated",
    qwik: "../qwik/generated",
    astro: "../astro/generated",
  },
  sourceMap: "external",
});
