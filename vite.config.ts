import { defineConfig } from "vite-plus";
import { fixtureTypecheckIgnorePatterns } from "./core/compiler/typecheck-exclusions.ts";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    // `core/core/src/vendor/**` is a verbatim copy of an upstream file. Formatting it would make
    // every re-sync diff unreadable; keeping it byte-identical is what makes re-syncing a plain
    // `diff`. See core/core/src/vendor/README.md.
    ignorePatterns: [".context/**", ".old/**", "ui/**/.styleframe/**", "core/core/src/vendor/**"],
  },
  lint: {
    // This list is what CI's Type Check job honours: `vp check --no-fmt --no-lint` skips lint
    // rules but still type-checks, and it reads `lint.ignorePatterns` to choose the file set.
    // Anything ignored here is invisible to the gate, so keep the entries file-scoped.
    // `core/core/src/vendor/**` is deliberately absent for that reason — it is the JSX surface
    // under test, so it has to stay type-checked; it is only excluded from `fmt` above.
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
