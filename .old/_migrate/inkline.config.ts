import { defineConfig } from '@inkline/loader';
import { useTheme } from '@inkline/theme';
import { useThemeComponents } from './src/theme';

export default defineConfig(() => {
    useTheme();
    useThemeComponents();
});
