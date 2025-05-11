export const defaultConfigFileContents = `import { defineConfig, defineTheme, defineThemes } from '@inkline/loader';

/**
 * Inkline Configuration
 *
 * This configuration will be merged with the default configuration.
 * You can override any default values for variables, elements, or components here.
 *
 * @docs https://inkline.io/docs/theming
 */

export default defineConfig({
    themes: defineThemes({
        default: defineTheme({}),
        dark: defineTheme({})
    })
});
`;

export const defaultNuxtDevEnvConfigFileContents = `import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({});
`;

export const defaultViteDevEnvConfigFileContents = `import { defineConfig } from 'vite';

export default defineConfig({});
`;

export const defaultWebpackTsDevEnvConfigFileContents = `import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';

export default <webpack.Configuration>{
  entry: path.resolve(__dirname, 'src', 'main.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
`;

export const defaultWebpackJsDevEnvConfigFileContents = `const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
`;
