import { defineConfig } from '@inkline/loader';
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
