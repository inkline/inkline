import { defineConfig } from '@inkline/config';
import { useTheme } from '@inkline/theme';
import { useThemeComponents } from './src/theme';

export default defineConfig(() => {
    useTheme();
    useThemeComponents();
});
