import { defineConfig } from '@inkline/loader';
import { useButtonTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useButtonTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
