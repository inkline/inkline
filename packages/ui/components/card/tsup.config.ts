import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/manifest.ts'],
    format: ['cjs', 'esm'],
    clean: false,
    dts: true,
    cjsInterop: true,
    splitting: true
});
