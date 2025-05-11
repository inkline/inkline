import { defineConfig } from '@inkline/loader';
import { useCheckboxGroupTheme, useCheckboxTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useCheckboxGroupTheme(options);
        useCheckboxTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
