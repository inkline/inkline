import { resolve } from 'path';
import { defineConfig } from 'vite';
import inkline from '@inkline/vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import postcss from '@inkline/postcss-config';
import { configDefaults as vitestConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        inkline({
            outputDir: resolve(__dirname, 'src', 'css')
        }),
        vue(),
        dts({ rollupTypes: true })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'index.ts'),
            name: 'InklineComponentCard',
            fileName: 'card'
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
            safelist: [/card/]
        })
    },
    test: {
        globals: true,
        include: ['src/**/*.spec.{ts,tsx}'],
        exclude: vitestConfig.exclude
    }
});
