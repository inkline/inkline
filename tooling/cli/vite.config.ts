import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      "bin/inkline": "src/bin/inkline.ts",
    },
    dts: {
      oxc: true,
    },
  },
  lint: {
    ignorePatterns: ["dist/**", "coverage/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  test: {
    testTimeout: 30_000,
  },
});
