import { defineConfig } from '@inkline/config';
import { useConfig } from '@inkline/core';
import { useTheme } from '@inkline/theme';
import { useThemeComponents } from './src/theme';

export default defineConfig(() => {
    useTheme();
    useThemeComponents();

    return useConfig();
});
