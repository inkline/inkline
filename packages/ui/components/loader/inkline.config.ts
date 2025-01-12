import { defineConfig } from '@inkline/config';
import { useLoaderTheme } from './src/theme';

export default defineConfig((options) => {
    useLoaderTheme(options);
});
