import { defineConfig } from '@inkline/config';
import { useButtonGroupTheme } from './src/theme';

export default defineConfig((options) => {
    useButtonGroupTheme(options);
});
