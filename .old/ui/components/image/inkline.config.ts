import { defineConfig } from '@inkline/loader';
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
