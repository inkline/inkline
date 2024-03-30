import { loadConfigFromFile } from './load';
import { resolve } from 'pathe';
import { generate } from './generate';
import { BuildOptions, ResolvedBuildOptions } from './types/build';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { getResolvedOptions } from './helpers';

/**
 * Load configuration, resolve and generate CSS files.
 *
 * @param options Build options.
 */
export async function build(options: BuildOptions = {}): Promise<ResolvedBuildOptions> {
    const resolvedOptions = getResolvedOptions(options);

    const config = await loadConfigFromFile({
        cwd: resolvedOptions.configDir,
        configFile: `${resolvedOptions.configFile}${resolvedOptions.configExtName}`
    });
    config.buildOptions = options as BuildOptions;

    const cssConfig = generate(config);

    if (!existsSync(resolvedOptions.outputDir)) {
        mkdirSync(resolvedOptions.outputDir, { recursive: true });
    }

    await Promise.all(
        Object.keys(cssConfig)
            .map(async (themeName) => {
                const themeOutputDir: string =
                    themeName === 'default'
                        ? (resolvedOptions.outputDir as string)
                        : resolve(resolvedOptions.outputDir as string, themeName);

                if (!existsSync(themeOutputDir)) {
                    mkdirSync(themeOutputDir);
                }

                return cssConfig[themeName].map(async (file) =>
                    writeFile(
                        resolve(themeOutputDir, `${file.name}${resolvedOptions.extName}`),
                        file.contents
                    )
                );
            })
            .flat()
    );

    if (resolvedOptions.manifest) {
        await writeFile(
            resolve(resolvedOptions.outputDir, 'manifest.json'),
            JSON.stringify(config.theme, null, 4)
        );
    }

    return resolvedOptions;
}
