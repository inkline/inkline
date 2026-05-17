import { defineConfig } from '@inkline/loader';
import { useGridTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useGridTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
