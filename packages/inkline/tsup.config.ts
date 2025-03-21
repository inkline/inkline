import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*.ts', '!src/*.d.ts', '!src/examples/**/*'],
    format: ['cjs', 'esm'],
    clean: true,
    dts: true,
    cjsInterop: true,
    splitting: true
});
