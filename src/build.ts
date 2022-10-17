import { loadConfigFromFile } from './load';
import { dirname, basename, extname, resolve } from 'pathe';
import { generate } from './generate';
import { DEFAULT_CONFIG_FILE, DEFAULT_OUTPUT_DIR, DEFAULT_OUTPUT_EXTNAME, DEFAULT_THEME_SELECTOR } from './constants';
import { BuildOptions, ResolvedBuildOptions } from './types/build';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { getResolvedOptions } from './helpers';

/**
 * Load configuration, resolve and generate CSS files.
 *
 * @param options Build options.
 */
export async function build (options: BuildOptions = {}): Promise<ResolvedBuildOptions> {
    const resolvedOptions = getResolvedOptions(options);

    const config = await loadConfigFromFile({
        cwd: resolvedOptions.configDir,
        configFile: resolvedOptions.configFile
    });

    config.buildOptions = options as BuildOptions;

    const cssConfig = generate(config);

    if (!existsSync(resolvedOptions.outputDir)) {
        mkdirSync(resolvedOptions.outputDir, { recursive: true });
    }

    await Promise.all(Object.keys(cssConfig).map(async (themeName) => {
        const themeOutputDir: string = themeName === 'default'
            ? resolvedOptions.outputDir as string
            : resolve(resolvedOptions.outputDir as string, themeName);

        if (!existsSync(themeOutputDir)) {
            mkdirSync(themeOutputDir);
        }

        return cssConfig[themeName].map(async (file) =>
            writeFile(resolve(themeOutputDir, `${file.name}${resolvedOptions.extName}`), file.contents)
        );
    }).flat());

    await writeFile(resolve(resolvedOptions.outputDir, 'manifest.json'), JSON.stringify(config.theme, null, 4));

    return resolvedOptions;
}
