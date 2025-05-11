import { defineConfig } from '@inkline/loader';
import { useFormTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useFormTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
