import purgecss from '@fullhuman/postcss-purgecss';

export default (options = {}) => ({
    plugins: [
        purgecss({
            content: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx', './src/**/*.vue'],
            variables: true,
            safelist: {
                greedy: options.safelist || []
            }
        })
    ]
});
