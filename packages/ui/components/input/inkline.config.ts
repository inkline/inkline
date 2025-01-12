import { defineConfig } from '@inkline/config';
import { useInputTheme } from './src/theme';

export default defineConfig((options) => {
    useInputTheme(options);
});
