import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import inkline from '@inkline/vite';
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
            name: 'InklineComponentPopover',
            fileName: 'popover'
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
            safelist: [/popover/]
        })
    },
    test: {
        globals: true,
        include: ['src/**/*.spec.{ts,tsx}'],
        exclude: vitestConfig.exclude
    }
});
