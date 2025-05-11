import { defineConfig } from '@inkline/loader';
import { useFormErrorTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useFormErrorTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
