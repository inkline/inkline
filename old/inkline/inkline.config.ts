import { defineConfig, useTheme } from '@inkline/config';
import { useElementThemes, useComponentThemes } from '@inkline/inkline/theme';

export default defineConfig(() => {
    useTheme();
    useElementThemes();
    useComponentThemes();
});
