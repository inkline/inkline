import { resolve } from 'path';
import { generateExports } from '@inkline/build';

const baseDir = resolve(__dirname, '..', '..');
const srcDir = resolve(baseDir, 'src');

const packageExports = new Map<
    string,
    string | { require?: string; import?: string; types?: string }
>([
    [
        '.',
        {
            require: './lib/inkline.js',
            import: './lib/inkline.mjs',
            types: './lib/inkline.d.ts'
        }
    ],
    [
        './dist',
        {
            require: './dist/inkline.umd.js',
            import: './dist/inkline.es.mjs',
            types: './lib/inkline.d.ts'
        }
    ],
    [
        './types',
        {
            types: './lib/types/index.d.ts'
        }
    ],
    [
        './css/*',
        {
            types: './lib/css/*'
        }
    ]
]);

(async () => {
    await generateExports(baseDir, {
        exports: packageExports,
        ignore: [resolve(srcDir, '**', '*.{d,spec,stories}.ts'), resolve(srcDir, 'main.ts')]
    });
})();
