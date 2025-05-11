import { defineConfig } from '@inkline/loader';
import { useButtonGroupTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useButtonGroupTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
