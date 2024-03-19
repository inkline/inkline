export default {
    extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recommended-vue/scss"
    ],
    rules: {
        'scss/at-if-closing-brace-space-after': null,
        'scss/at-if-closing-brace-newline-after': null,
        'scss/at-else-closing-brace-space-after': null,
        'scss/at-else-closing-brace-newline-after': null,
        'scss/operator-no-newline-after': null,
        'scss/comment-no-empty': null,
        'alpha-value-notation': null,
        'at-rule-empty-line-before': null,
        'color-function-notation': null,
        'custom-property-pattern': null,
        'custom-property-empty-line-before': null,
        'number-max-precision': null,
        'media-feature-range-notation': null,
        'no-descending-specificity': null,
        'property-no-vendor-prefix': null,
        'selector-class-pattern': null,
        'value-keyword-case': null,
    }
}
