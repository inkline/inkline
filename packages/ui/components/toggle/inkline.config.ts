import { defineConfig } from '@inkline/config';
import { useToggleTheme } from './src/theme';

export default defineConfig(() => {
    useToggleTheme();
});