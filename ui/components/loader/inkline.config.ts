import { defineConfig } from '@inkline/loader';
import { useLoaderTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useLoaderTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
