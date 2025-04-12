import { defineConfig } from '@inkline/config';
import { useImageTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useImageTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
