import { defineConfig } from '@inkline/loader';
import { usePopoverTheme } from './src/theme';

export default defineConfig(
    (options) => {
        usePopoverTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
