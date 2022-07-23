import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        {
            builder: 'mkdist',
            format: 'cjs',
            input: './src',
            outDir: './lib'
        },
        {
            builder: 'mkdist',
            format: 'esm',
            input: './src',
            outDir: './lib'
        }
    ],
    declaration: true,
    hooks: {
        'mkdist:entry:options': (ctx, entry, options) =>{
            options.cleanDist = false;
        }
    }
});
