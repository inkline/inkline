import { defineConfig } from '@inkline/loader';
import { useBaseComponentTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useBaseComponentTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
