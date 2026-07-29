import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: { ignorePatterns: [".context/**", ".old/**", "ui/**/.styleframe/**"] },
  lint: {
    // `core/compiler/src/__fixtures__/**` is deliberately absent: `ignorePatterns` gates the
    // type-check path too, and the 101 authored `.ink.tsx` fixtures are the control that catches a
    // regression in `@inkline/core`'s JSX surface (e.g. a bad Solid bump). They must stay checked.
    ignorePatterns: [".context/**", ".old/**", "ui/**/.styleframe/**"],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
