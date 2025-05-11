import { defineConfig } from '@inkline/loader';
import { useFormGroupTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useFormGroupTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
