import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      cli: "src/cli.ts",
      compiler: "src/compiler.ts",
      "config-loader": "src/config-loader.ts",
      react: "src/react.ts",
      vue: "src/vue.ts",
      svelte: "src/svelte.ts",
      solid: "src/solid.ts",
      angular: "src/angular.ts",
      qwik: "src/qwik.ts",
      astro: "src/astro.ts",
      "plugin/vite": "src/plugin/vite.ts",
      "plugin/webpack": "src/plugin/webpack.ts",
      "plugin/rollup": "src/plugin/rollup.ts",
      "plugin/esbuild": "src/plugin/esbuild.ts",
      "plugin/rspack": "src/plugin/rspack.ts",
      "plugin/farm": "src/plugin/farm.ts",
    },
    dts: {
      oxc: true,
    },
    format: ["esm", "cjs"],
  },
});
