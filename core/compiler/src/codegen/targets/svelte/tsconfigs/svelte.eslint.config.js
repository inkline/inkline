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
    },
  },
];
