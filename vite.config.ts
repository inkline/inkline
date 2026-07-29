import { defineConfig } from "vite-plus";

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
    // `core/compiler/src/__fixtures__/**` is deliberately absent: `ignorePatterns` gates the
    // type-check path too, and the 101 authored `.ink.tsx` fixtures are the control that catches a
    // regression in `@inkline/core`'s JSX surface (e.g. a bad re-sync of the vendored element
    // types). They must stay checked. The vendored copy itself is absent for the same reason — it
    // is the surface under test, so it has to be type-checked; it is only excluded from `fmt`.
    ignorePatterns: [".context/**", ".old/**", "ui/**/.styleframe/**"],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
