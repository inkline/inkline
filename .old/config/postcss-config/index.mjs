import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

export default (options = { safelist: [] }) => ({
    plugins: [
        purgeCSSPlugin({
            content: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx', './src/**/*.vue'],
            variables: true,
            safelist: {
                greedy: options.safelist ?? []
            }
        })
    ]
});
