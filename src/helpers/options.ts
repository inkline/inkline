import { DEFAULT_CONFIG_FILE, DEFAULT_OUTPUT_DIR, DEFAULT_OUTPUT_EXTNAME, DEFAULT_THEME_SELECTOR } from '../constants';
import { basename, dirname, extname, resolve } from 'pathe';
import { BuildOptions, ResolvedBuildOptions } from '../types/build';

export function getResolvedOptions (options: BuildOptions): ResolvedBuildOptions {
    const resolvedOptions: ResolvedBuildOptions = {
        configDir: '',
        configFile: '',
        extName: '.',
        outputDir: '',
        themeSelector: ''
    };

    let configDir = process.cwd();
    let configFile = DEFAULT_CONFIG_FILE;

    if (options.configFile) {
        configDir = dirname(options.configFile);
        configFile = basename(options.configFile.replace(extname(options.configFile), ''));
    }

    resolvedOptions.configDir = configDir;
    resolvedOptions.configFile = configFile;
    resolvedOptions.extName = options.extName || DEFAULT_OUTPUT_EXTNAME;
    resolvedOptions.themeSelector = options.themeSelector || DEFAULT_THEME_SELECTOR;
    resolvedOptions.outputDir = options.outputDir || resolve(configDir, DEFAULT_OUTPUT_DIR);

    return resolvedOptions;
}
