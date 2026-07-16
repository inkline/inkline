import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      "preset/main": "src/preset/main.ts",
      "preset/parameters": "src/preset/parameters.ts",
      "generator/index": "src/generator/index.ts",
    },
    copy: [{ from: "src/preset/preview.css", to: "dist/preset" }],
    dts: {},
  },
  lint: {
    ignorePatterns: ["dist/**", "coverage/**", "src/**/__fixtures__/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/**/__fixtures__/**", "src/index.ts"],
      thresholds: {
        lines: 100,
        branches: 100,
        functions: 100,
        statements: 100,
      },
    },
  },
});
