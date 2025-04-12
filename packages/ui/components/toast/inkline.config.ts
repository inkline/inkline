import { defineConfig } from '@inkline/config';
import { useToastTheme, useToastContainerTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useToastTheme(options);
        useToastContainerTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
