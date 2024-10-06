import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { configDefaults as vitestConfig } from 'vitest/config';

export default defineConfig({
    plugins: [vue(), dts({ rollupTypes: true })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'index.ts'),
            name: 'InklineComponentAlert',
            fileName: 'alert'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    test: {
        globals: true,
        setupFiles: ['src/__tests__/setup.ts'],
        include: ['src/**/*.spec.{ts,tsx}'],
        exclude: vitestConfig.exclude
    }
});
