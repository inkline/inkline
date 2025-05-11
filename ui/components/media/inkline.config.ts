import { defineConfig } from '@inkline/loader';
import { useMediaTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useMediaTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
