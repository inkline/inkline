import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import postcss from '@inkline/postcss-config';
import { configDefaults as vitestConfig } from 'vitest/config';

export default defineConfig({
    plugins: [vue(), dts({ rollupTypes: true })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'index.ts'),
            name: 'InklineComponentLinkable',
            fileName: 'linkable'
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
    css: {
        postcss: postcss({
            safelist: [/linkable/]
        })
    },
    test: {
        globals: true,
        include: ['src/**/*.spec.{ts,tsx}'],
        exclude: vitestConfig.exclude
    }
});
