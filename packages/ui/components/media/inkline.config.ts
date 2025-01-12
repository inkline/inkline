import { defineConfig } from '@inkline/config';
import { useMediaTheme } from './src/theme';

export default defineConfig((options) => {
    useMediaTheme(options);
});
