import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index",
    "src/vite",
    "src/webpack",
    "src/rollup",
    "src/esbuild",
    "src/rspack",
    "src/farm",
  ],
  declaration: true,
  externals: [
    "@inkline/compiler",
    "vite",
    "webpack",
    "rollup",
    "esbuild",
    "@farmfe/core",
    "@rspack/core",
  ],
  rollup: {
    emitCJS: true,
  },
});
