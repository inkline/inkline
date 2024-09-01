import { defineConfig, useTheme } from '@inkline/config';
import { useComponentThemes, useElementThemes } from './src/theme';

export default defineConfig(() => {
    useTheme();
    useElementThemes();
    useComponentThemes();
});
