import { defineConfig } from '@inkline/loader';
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
