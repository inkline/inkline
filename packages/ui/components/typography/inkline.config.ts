import { defineConfig } from '@inkline/config';
import { useTypographyTheme } from './src/theme';

export default defineConfig((options) => {
    useTypographyTheme(options);
});
