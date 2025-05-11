import { defineConfig } from '@inkline/loader';
import { useNavTheme, useNavItemTheme } from './src/theme';

export default defineConfig(
    (options) => {
        useNavTheme(options);
        useNavItemTheme(options);
    },
    {
        generator: {
            variants: false
        }
    }
);
