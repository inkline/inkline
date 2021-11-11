import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import markdown from 'vite-plugin-md';

/**
 * Vite configuration shared between library build and storybook build
 *
 * @doc https://vitejs.dev/config/
 */
export default defineConfig({
    plugins: [
        vue({
            include: [
                /\.vue$/,
                /\.md$/
            ]
        }),
        markdown()
    ],
    resolve: {
        alias: [
            {
                find: /^@inkline\/inkline\//,
                replacement: `${resolve(__dirname)}/src/`
            },
            // Replacement used in .scss when importing files from node_modules using ~ pattern
            {
                find: /^~@inkline\/icons/,
                replacement: '@inkline/icons'
            }
        ]
    },
    optimizeDeps: {
        exclude: [
            'coverage',
            'dist',
            'lib',
            'package',
            'scripts'
        ]
    }
});
