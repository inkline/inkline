import { defineConfig } from '@inkline/config';
import { useAlertTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useAlertTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
