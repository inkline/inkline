import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { configDefaults as vitestConfig } from 'vitest/config';
import inkline from '@inkline/plugin/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        inkline({
            outputDir: resolve(__dirname, 'src', 'theme')
        }),
        vue(),
        dts({ rollupTypes: true })
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline$/,
                replacement: `${resolve(__dirname)}/src/inkline.ts`
            },
            {
                find: /^@inkline\/inkline\//,
                replacement: `${resolve(__dirname)}/src/`
            }
        ]
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'main.ts'),
            name: 'InklineVue',
            fileName: 'inkline'
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
        include: ['src/**/*.spec.{ts,tsx}'],
        exclude: vitestConfig.exclude
    }
});
