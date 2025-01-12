import { defineConfig } from '@inkline/config';
import { useFormErrorTheme } from './src/theme';

export default defineConfig((options) => {
    useFormErrorTheme(options);
});
