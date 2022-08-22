import { loadConfigFromFile } from './load';
import { dirname, basename, extname, resolve } from 'pathe';
import { generate } from './generate';
import {DEFAULT_CONFIG_FILE, DEFAULT_OUTPUT_DIR, DEFAULT_OUTPUT_EXTNAME, DEFAULT_THEME_SELECTOR} from './constants';
import { BuildOptions } from './types/build';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';

/**
 * Load configuration, resolve and generate CSS files.
 *
 * @param options Build options.
 */
export async function build (options: BuildOptions = {}) {
    let configDir = process.cwd();
    let configFile = DEFAULT_CONFIG_FILE;

    if (options.configFile) {
        configDir = dirname(options.configFile);
        configFile = basename(options.configFile.replace(extname(options.configFile), ''));
    }

    options.extName = options.extName || DEFAULT_OUTPUT_EXTNAME;
    options.themeSelector = options.themeSelector || DEFAULT_THEME_SELECTOR;
    options.outputDir = options.outputDir || resolve(configDir, DEFAULT_OUTPUT_DIR);

    const config = await loadConfigFromFile({
        cwd: configDir,
        configFile
    });

    config.buildOptions = options as BuildOptions;

    const cssConfig = generate(config);

    if (!existsSync(options.outputDir)) {
        mkdirSync(options.outputDir, { recursive: true });
    }

    await Promise.all(Object.keys(cssConfig).map(async (themeName) => {
        const themeOutputDir: string = themeName === 'default'
            ? options.outputDir as string
            : resolve(options.outputDir as string, themeName);

        if (!existsSync(themeOutputDir)) {
            mkdirSync(themeOutputDir);
        }

        return cssConfig[themeName].map(async (file) =>
            writeFile(resolve(themeOutputDir, `${file.name}${options.extName}`), file.contents)
        );
    }).flat());

    return {
        ...options,
        configDir,
        configFile
    };
}
