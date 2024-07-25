import { defineConfig } from '../../utils';
import { defaultThemes } from './themes';
import { defaultModules } from './modules';

export * from './modules';
export * from './themes';

export const defaultConfig = defineConfig({
    modules: defaultModules,
    themes: defaultThemes
});
