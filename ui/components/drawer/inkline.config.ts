import { defineConfig } from '@inkline/config';
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
