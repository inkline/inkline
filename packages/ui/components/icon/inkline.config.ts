import { defineConfig } from '@inkline/config';
import { useIconTheme } from './src/theme';

export default defineConfig((options) => {
    useIconTheme(options);
});
