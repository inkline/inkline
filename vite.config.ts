import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import inspect from 'vite-plugin-inspect';
import { inkline } from './src/vite';
import { resolve } from 'path';
import { unocss } from './src/preset';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        inspect(),
        inkline({
            outputDir: resolve(__dirname, 'src/playground/vite/css/config'),
            plugins: [
                unocss()
            ]
        })
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'lib/**']
    }
});
