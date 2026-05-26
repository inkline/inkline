import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: { ignorePatterns: [".context/**", ".old/**", "ui/**/.styleframe/**"] },
  lint: {
    ignorePatterns: [
      ".context/**",
      ".old/**",
      "core/compiler/src/__fixtures__/**",
      "ui/**/.styleframe/**",
    ],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
