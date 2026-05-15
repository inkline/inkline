import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      "bin/inkline": "src/bin/inkline.ts",
    },
    dts: {
      tsgo: true,
    },
  },
  lint: {
    ignorePatterns: ["dist/**", "coverage/**", "src/__fixtures__/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
