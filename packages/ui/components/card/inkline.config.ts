import { defineConfig } from '@inkline/config';
import { useCardTheme } from './src/theme';

export default defineConfig((options) => {
    useCardTheme(options);
});
