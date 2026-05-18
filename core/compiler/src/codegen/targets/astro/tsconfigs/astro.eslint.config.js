import astro from "eslint-plugin-astro";

export default [
  ...astro.configs["flat/recommended"],
  {
    rules: {
      "no-unused-vars": "off",
    },
  },
];
