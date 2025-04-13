module.exports = {
    trailingComma: 'none',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 100,
    overrides: [
        {
            files: '*.md',
            options: {
                proseWrap: 'always'
            }
        }
    ]
};
