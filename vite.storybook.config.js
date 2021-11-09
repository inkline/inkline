import commonConfig from './vite.common.config';
import { defineConfig } from 'vite';

/**
 * Vite configuration for library build
 *
 * @doc https://vitejs.dev/config/
 */
export default defineConfig({
    ...commonConfig,
    base: '/storybook/'
});
