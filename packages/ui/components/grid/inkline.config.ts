import { defineConfig } from '@inkline/config';
import { useGridTheme } from './src/theme';

export default defineConfig((options) => {
    useGridTheme(options);
});
