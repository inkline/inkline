import { defineConfig } from '@inkline/config';
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
