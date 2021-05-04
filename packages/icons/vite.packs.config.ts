import { defineConfig, InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default (lib: {
    entry: string;
    name: string;
    fileName?: string;
}): InlineConfig => defineConfig({
    plugins: [
        vue()
    ],
    build: {
        lib,
        emptyOutDir: false,
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
}) as InlineConfig;
