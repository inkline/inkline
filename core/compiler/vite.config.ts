import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
    },
    dts: {
      oxc: true,
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
  test: {
    testTimeout: 15_000,
  },
});
