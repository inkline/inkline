import { defineConfig } from '@inkline/loader';
import { useModalContainerTheme, useModalTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useModalContainerTheme(options);
        useModalTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
