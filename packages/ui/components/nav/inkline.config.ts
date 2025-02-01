import { defineConfig } from '@inkline/config';
import { useNavTheme, useNavItemTheme } from './src/theme';

export default defineConfig((options) => {
    useNavTheme(options);
    useNavItemTheme(options);
});
