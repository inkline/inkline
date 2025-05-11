import { defineConfig } from '@inkline/loader';
import { useToggleTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useToggleTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
