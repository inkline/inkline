import { defineConfig } from '@inkline/config';
import { useButtonTheme } from './src/theme';

export default defineConfig((options) => {
    useButtonTheme(options);
});
