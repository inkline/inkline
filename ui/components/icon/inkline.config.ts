import { defineConfig } from '@inkline/loader';
import { useIconTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useIconTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
