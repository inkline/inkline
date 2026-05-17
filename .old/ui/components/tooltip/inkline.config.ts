import { defineConfig } from '@inkline/loader';
import { useTooltipTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useTooltipTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
