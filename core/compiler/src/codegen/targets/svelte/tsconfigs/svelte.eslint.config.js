import svelte from "eslint-plugin-svelte";
import tsParser from "@typescript-eslint/parser";

export default [
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: {
      "no-unused-vars": "off",
      // Misfires on generated lifecycle code: `$state(false)` set once in an onMount `$effect`
      // is not derivable from other reactive state.
      "svelte/prefer-writable-derived": "off",
    },
  },
];
