import { defineConfig } from '@inkline/config';
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
