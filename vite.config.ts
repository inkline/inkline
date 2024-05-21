import { defineConfig } from 'vite';
import { resolve } from 'path';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: /^@inkline\/config\//,
                replacement: `${resolve(__dirname)}/src/`
            }
        ]
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'index.ts'),
            name: 'InklineConfig',
            fileName: (format) => `config.${format}.js`
        },
        rollupOptions: {
            output: {
                exports: 'named'
            }
        }
    },
    test: {
        globals: true,
        include: ['src/**/*.spec.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'lib/**']
    }
});
