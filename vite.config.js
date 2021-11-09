import commonConfig from './vite.common.config';
import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Vite configuration for library build
 *
 * @doc https://vitejs.dev/config/
 */
export default defineConfig({
    ...commonConfig,
    build: {
        lib: {
            entry: resolve(__dirname, 'src', 'inkline.ts'),
            name: 'Inkline'
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                exports: 'named',
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});
