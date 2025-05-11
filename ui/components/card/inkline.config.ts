import { defineConfig } from '@inkline/loader';
import { useCardTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useCardTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
