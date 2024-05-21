import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

const overrides = {
  rules: {
    semi: ['warn', 'always'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'no-prototype-builtins': 'off',
    // 'max-params': 'off',
    // indent: 'off',
    // 'no-void': 'off',
    // 'no-undef': 'off',
    // 'no-unused-vars': 'off',
    // 'no-use-before-define': 'off',
    // 'no-case-declarations': 'off',
    // 'max-nested-callbacks': 'off',
    // '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/consistent-type-imports': 'warn',
    'vue/html-indent': ['warn', 4],
    // 'vue/max-attributes-per-line': 'off',
    // 'vue/custom-event-name-casing': 'off',
    // 'vue/multi-word-component-names': 'off',
    // 'vue/require-prop-types': 'off',
    // 'vue/comment-directive': 'off',
    // 'vue/no-dupe-keys': 'off',
    // 'vue/v-on-event-hyphenation': 'off',
    // 'vue/singleline-html-element-content-newline': 'off',
    // 'vue/html-self-closing': 'off',
    // 'vue/attribute-hyphenation': 'off'
  }
};

export default {
  configs: {
    "vue": [
      eslint.configs.recommended,
      ...tslint.configs.recommended,
      ...pluginVue.configs["flat/recommended"],
      overrides
    ],
    "default": tslint.config(
      eslint.configs.recommended,
      ...tslint.configs.recommendedTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            extraFileExtensions: [".vue"],
            project: [
              "tsconfig.json",
              "tsconfig.test.json"
            ],
            tsconfigRootDir: import.meta.dirname
          }
        }
      },
      overrides
    )
  }
};

// module.exports = {
//     env: {
//         node: true,
//         jest: true,
//         browser: true,
//         es2021: true
//     },
//     extends: ['standard', 'prettier'],
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//         ecmaVersion: 12,
//         parser: '@typescript-eslint/parser',
//         sourceType: 'module',
//         ecmaFeatures: {
//             jsx: true,
//             globalReturn: true
//         }
//     },
//     plugins: ['@typescript-eslint'],
//     rules: {
//         semi: ['warn', 'always'],
//         'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
//         'no-prototype-builtins': 'off',
//         'max-params': 'off',
//         indent: 'off',
//         'no-void': 'off',
//         'no-undef': 'off',
//         'no-unused-vars': 'off',
//         'no-use-before-define': 'off',
//         'no-case-declarations': 'off',
//         'max-nested-callbacks': 'off',
//         '@typescript-eslint/ban-ts-comment': 'off',
//         '@typescript-eslint/no-explicit-any': 'off',
//         '@typescript-eslint/no-non-null-assertion': 'off',
//         '@typescript-eslint/no-empty-function': 'off',
//         '@typescript-eslint/explicit-module-boundary-types': 'off',
//         '@typescript-eslint/consistent-type-imports': 'warn',
//         'vue/html-indent': ['warn', 4],
//         'vue/max-attributes-per-line': 'off',
//         'vue/custom-event-name-casing': 'off',
//         'vue/multi-word-component-names': 'off',
//         'vue/require-prop-types': 'off',
//         'vue/comment-directive': 'off',
//         'vue/no-dupe-keys': 'off',
//         'vue/v-on-event-hyphenation': 'off',
//         'vue/singleline-html-element-content-newline': 'off',
//         'vue/html-self-closing': 'off',
//         'vue/attribute-hyphenation': 'off'
//     }
// };
