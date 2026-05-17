import angular from "@angular-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    plugins: { "@angular-eslint": angular },
    rules: {
      "no-unused-vars": "off",
      "@angular-eslint/no-empty-lifecycle-method": "error",
      "@angular-eslint/component-class-suffix": "error",
      "@angular-eslint/use-lifecycle-interface": "warn",
    },
  },
];
