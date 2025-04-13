import { defineConfig } from '@inkline/config';
import { useExpandTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useExpandTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
