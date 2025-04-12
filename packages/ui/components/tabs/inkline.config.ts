import { defineConfig } from '@inkline/config';
import { useTabsTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useTabsTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
