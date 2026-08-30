import { defineConfig } from "vite-plus";
import { fixtureTypecheckIgnorePatterns } from "./typecheck-exclusions.ts";

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      ir: "src/ir/index.ts",
      codegen: "src/codegen/index.ts",
      testing: "src/testing/index.ts",
    },
    dts: {
      oxc: true,
    },
  },
  lint: {
    // Mirrors the root config so a package-level `vp check` sees the same file set as CI.
    ignorePatterns: ["dist/**", "coverage/**", ...fixtureTypecheckIgnorePatterns()],
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
