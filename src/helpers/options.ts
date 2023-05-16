import {
    DEFAULT_CONFIG_EXT,
    DEFAULT_CONFIG_FILE,
    DEFAULT_OUTPUT_DIR,
    DEFAULT_OUTPUT_EXTNAME,
    DEFAULT_THEME_SELECTOR
} from '../constants';
import { basename, dirname, extname, resolve } from 'pathe';
import { BuildOptions, ResolvedBuildOptions } from '../types/build';
import { existsSync } from 'fs';

export function getResolvedOptions(options: BuildOptions): ResolvedBuildOptions {
    const resolvedOptions: ResolvedBuildOptions = {
        configDir: process.cwd(),
        configFile: DEFAULT_CONFIG_FILE,
        configExtName: DEFAULT_CONFIG_EXT,
        themeSelector: options.themeSelector || DEFAULT_THEME_SELECTOR,
        extName: options.extName || DEFAULT_OUTPUT_EXTNAME,
        manifest: !!options.manifest,
        outputDir: ''
    };

    if (options.configFile) {
        resolvedOptions.configDir = dirname(options.configFile);
        resolvedOptions.configFile = basename(
            options.configFile.replace(extname(options.configFile), '')
        );
        resolvedOptions.configExtName = extname(options.configFile) as `.${'js' | 'ts'}`;
    } else {
        if (existsSync(resolve(resolvedOptions.configDir, `${resolvedOptions.configFile}.js`))) {
            resolvedOptions.configExtName = '.js';
        }
    }

    resolvedOptions.outputDir =
        options.outputDir || resolve(resolvedOptions.configDir, DEFAULT_OUTPUT_DIR);

    return resolvedOptions;
}
