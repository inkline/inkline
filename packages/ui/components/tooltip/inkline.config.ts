import { defineConfig } from '@inkline/config';
import { useTooltipTheme } from './src/theme';

export default defineConfig((options) => {
    useTooltipTheme(options);
});
