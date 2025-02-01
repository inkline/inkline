import { defineConfig, useTheme, useComponentsTheme } from 'inkline';

export default defineConfig((options) => {
    useTheme(options);
    useComponentsTheme(options);
});
