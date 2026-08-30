import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    ignorePatterns: ["coverage/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  test: {
    // Each case shells out to `pnpm pack` for one package (~0.2s), and the suite is
    // small enough that serial keeps the output readable.
    fileParallelism: false,
    testTimeout: 30_000,
  },
});
