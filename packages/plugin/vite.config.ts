import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import inspect from 'vite-plugin-inspect';
import { inkline } from './src/vite';
import { resolve } from 'path';
import { UserOptions } from './src/plugin/types';

const inklineConfig: UserOptions = {
    outputDir: resolve(__dirname, 'src/playground/vite/css')
};

// https://vitejs.dev/config/
export default defineConfig({
    root: resolve(__dirname, 'src/playground/vite'),
    server: {
        port: 8080
    },
    plugins: [
        inspect(),
        inkline(inklineConfig)
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'lib/**']
    }
});
