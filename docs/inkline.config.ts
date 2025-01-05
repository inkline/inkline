import { defineConfig, useComponentsTheme, useTheme } from 'inkline';

console.log(useTheme, useComponentsTheme);

export default defineConfig(() => {
    useTheme();
    useComponentsTheme();
});
