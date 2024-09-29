import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";

const overrides = {
    rules: {
        semi: ["warn", "always"],
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
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
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-redundant-type-constituents": "off",
        "@typescript-eslint/no-duplicate-type-constituents": "off",
        "@typescript-eslint/no-unused-vars": [
            "warn", // or "error"
            {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
                "caughtErrorsIgnorePattern": "^_"
            }
        ]
        // '@typescript-eslint/no-non-null-assertion': 'off',
        // '@typescript-eslint/no-empty-function': 'off',
        // '@typescript-eslint/explicit-module-boundary-types': 'off',
        // '@typescript-eslint/consistent-type-imports': 'warn',
    }
};

const vueOverrides = {
    rules: {
        "vue/html-indent": ["warn", 4]
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

export default (baseDir) => ({
    configs: {
        "vue": [
            eslint.configs.recommended,
            ...tslint.configs.recommended,
            ...pluginVue.configs["flat/recommended"],
            overrides,
            vueOverrides,
            pluginPrettier,
            {
                languageOptions: {
                    parser: vueParser,
                    parserOptions: {
                        parser: tsParser,
                        extraFileExtensions: [".vue"],
                        project: [
                            "./tsconfig.json"
                        ],
                        tsconfigRootDir: baseDir
                    }
                }
            }
        ],
        "default": tslint.config(
            eslint.configs.recommended,
            ...tslint.configs.recommendedTypeChecked,
            {
                languageOptions: {
                    parserOptions: {
                        project: [
                            "./tsconfig.json"
                        ],
                        tsconfigRootDir: baseDir
                    }
                }
            },
            overrides
        )
    }
});

