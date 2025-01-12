import { defineConfig } from '@inkline/config';
import { useBadgeTheme } from './src/theme';

export default defineConfig((options) => {
    useBadgeTheme(options);
});
