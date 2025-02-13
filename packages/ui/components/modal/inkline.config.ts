import { defineConfig } from '@inkline/config';
import { useModalContainerTheme, useModalTheme } from './src/theme';

export default defineConfig((options) => {
    useModalContainerTheme(options);
    useModalTheme(options);
});
