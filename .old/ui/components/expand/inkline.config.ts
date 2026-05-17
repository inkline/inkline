import { defineConfig } from '@inkline/loader';
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
