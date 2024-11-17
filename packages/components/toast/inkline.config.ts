import { defineConfig } from '@inkline/config';
import { useToastTheme, useToastContainerTheme } from './src/theme';

export default defineConfig(() => {
    useToastTheme();
    useToastContainerTheme();
});
