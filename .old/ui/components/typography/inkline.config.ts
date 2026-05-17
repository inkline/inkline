import { defineConfig } from '@inkline/loader';
import { useTypographyTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useTypographyTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
