import { defineConfig } from '@inkline/loader';
import { useBadgeTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useBadgeTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
