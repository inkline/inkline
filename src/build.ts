import { loadConfigFromFile } from './load';
import { dirname, basename, extname, resolve } from 'pathe';
import { generate } from './generate';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { DEFAULT_OUTPUT_DIR, DEFAULT_OUTPUT_EXTNAME } from './constants';

export interface BuildOptions {
    configFile?: string;
    outputDir?: string;
    extname?: string;
}

/**
 * Load configuration, resolve and generate CSS files.
 *
 * @param options Build options.
 */
export async function build (options: BuildOptions = {}) {
    let configDir = process.cwd();
    let configFile = 'inkline.config';

    if (options.configFile) {
        configDir = dirname(options.configFile);
        configFile = basename(options.configFile.replace(extname(options.configFile), ''));
    }

    const config = await loadConfigFromFile({
        cwd: configDir,
        configFile: configFile
    });

    const outputExtname = options.extname || DEFAULT_OUTPUT_EXTNAME;
    const outputDir = options.outputDir || resolve(configDir, DEFAULT_OUTPUT_DIR);
    const cssConfig = generate(config, options);

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    await Promise.all(cssConfig.map(
        async (file) => writeFile(resolve(outputDir, `${file.name}${outputExtname}`), file.value)
    ));

    return {
        configDir,
        configFile,
        outputDir
    };
}
