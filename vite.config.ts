import { defineConfig } from "vite-plus";
import { fixtureTypecheckIgnorePatterns } from "./core/compiler/typecheck-exclusions.ts";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: { ignorePatterns: [".context/**", ".old/**", "ui/**/.styleframe/**"] },
  lint: {
    // This list is what CI's Type Check job honours: `vp check --no-fmt --no-lint` skips lint
    // rules but still type-checks, and it reads `lint.ignorePatterns` to choose the file set.
    // Anything ignored here is invisible to the gate, so keep the entries file-scoped.
    ignorePatterns: [
      ".context/**",
      ".old/**",
      "ui/**/.styleframe/**",
      // The compiler's authoring fixtures are type-checked. The few that cannot be are opted
      // out one file at a time, each with its diagnostic code and reason, in the file below.
      ...fixtureTypecheckIgnorePatterns("core/compiler"),
    ],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
