import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/*.ts'],
    format: ['cjs', 'esm'],
    clean: true,
    dts: true,
    cjsInterop: true,
    splitting: true,
    banner: {
        js: `
import { fileURLToPath } from 'node:url';
import { createRequire as topLevelCreateRequire } from 'node:module';
import { dirname as topLevelDirname } from 'node:path';
const require = topLevelCreateRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = topLevelDirname(__filename);
`
    }
});
