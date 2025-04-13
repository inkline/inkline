import { defineConfig } from '@inkline/config';
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
