import { defineConfig } from '@inkline/config';
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
