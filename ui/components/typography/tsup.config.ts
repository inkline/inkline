import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/manifest.ts', 'src/theme.ts'],
    format: ['cjs', 'esm'],
    clean: false,
    dts: true,
    cjsInterop: true,
    splitting: true
});
