import { defineConfig } from '@inkline/config';
import { useCheckboxGroupTheme, useCheckboxTheme } from './src/theme';

export default defineConfig((options) => {
    useCheckboxGroupTheme(options);
    useCheckboxTheme(options);
});
