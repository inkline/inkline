import { defineConfig } from '@inkline/config';
import { useFormTheme } from './src/theme';

export default defineConfig((options) => {
    useFormTheme(options);
});
