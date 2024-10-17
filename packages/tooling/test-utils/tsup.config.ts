import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/cli/main.ts', 'src/index.ts'],
    format: ['cjs', 'esm'],
    clean: true,
    dts: true,
    cjsInterop: true,
    splitting: true
});
