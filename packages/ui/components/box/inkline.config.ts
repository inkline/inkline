import { defineConfig } from '@inkline/config';
import { useBoxTheme } from './src/theme';

export default defineConfig((options) => {
    useBoxTheme(options);
});
