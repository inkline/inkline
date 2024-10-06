import type { StorybookConfig } from '@storybook/vue3-vite';

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}

const srcDir = '../../vue/src';

const config: StorybookConfig = {
    stories: [`${srcDir}/**/*.mdx`, `${srcDir}/**/*.stories.@(js|jsx|mjs|ts|tsx)`],
    addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-interactions')
    ],
    framework: {
        name: getAbsolutePath('@storybook/vue3-vite'),
        options: {}
    }
};
export default config;
