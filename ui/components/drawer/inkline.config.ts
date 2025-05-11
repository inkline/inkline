import { defineConfig } from '@inkline/loader';
import { useDrawerTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useDrawerTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
