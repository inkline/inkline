import { defineConfig } from '@inkline/loader';
import { useInputTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useInputTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
