import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        {
            builder: 'mkdist',
            format: 'cjs',
            input: './src',
            outDir: './lib',
            declaration: false
        },
        {
            builder: 'mkdist',
            format: 'esm',
            input: './src',
            outDir: './lib',
            declaration: true
        }
    ],
    clean: true,
    failOnWarn: false
});
