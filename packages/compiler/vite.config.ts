import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
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
