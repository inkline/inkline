import { defineConfig } from '@inkline/loader';
import { useBreadcrumbTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useBreadcrumbTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
