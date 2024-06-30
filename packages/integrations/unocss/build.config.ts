export default {
    failOnWarn: false,
    entries: [
        {
            builder: 'mkdist',
            format: 'esm',
            ext: 'mjs',
            input: './src',
            outDir: './lib',
            declaration: true
        },
        {
            builder: 'mkdist',
            format: 'cjs',
            ext: 'cjs',
            input: './src',
            outDir: './lib',
            declaration: false
        }
    ]
};
