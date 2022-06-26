import { createUnplugin } from 'unplugin';
import { dirname, resolve } from 'pathe';
import {
    DEFAULT_CONFIG_FILE,
    DEFAULT_OUTPUT_DIR
} from './constants';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

import { generate, loadConfigFromFile } from '@inkline/config';

export interface UserOptions {
    configFile?: string | RegExp;
    outputDir?: string;
}

const isConfigFile = (options: UserOptions, id: string) => {
    const configFile = options.configFile || DEFAULT_CONFIG_FILE;

    return typeof configFile === 'string'
        ? id.endsWith(configFile)
        : configFile.test(id);
};

export const plugin = createUnplugin((options: UserOptions = {}) => {
    const outputDir = options.outputDir || (require.main
        ? require.main.filename.replace(/node_modules\/.+$/, DEFAULT_OUTPUT_DIR)
        : resolve(process.cwd(), DEFAULT_OUTPUT_DIR));
    const cssOutputDir = resolve(outputDir, 'css');

    return {
        name: 'inkline',
        enforce: 'pre',
        transformInclude: (id) => {
            return isConfigFile(options, id);
        },
        transform: async (code, id) => {
            if (isConfigFile(options, id)) {
                const config = await loadConfigFromFile({
                    cwd: dirname(id)
                });
                const cssConfig = generate(config);

                if (!existsSync(cssOutputDir)) {
                    mkdirSync(cssOutputDir, { recursive: true });
                }

                cssConfig.forEach((file) => {
                    writeFile(resolve(cssOutputDir, `${file.name}.css`), file.value);
                });

                return `import "${resolve(cssOutputDir, 'index.css')}";`;
            }
        }
    };
});

export const vitePlugin = plugin.vite;
export const rollupPlugin = plugin.rollup;
export const webpackPlugin = plugin.webpack;
export const esbuildPlugin = plugin.esbuild;
