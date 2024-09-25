/**
 * Load configuration, resolve and generate files.
 *
 * @param options Build options.
 */
import { ConfigurationOptions } from './types';
import {
    defaultConfigFileBasename,
    defaultConfigFileExtName,
    defaultConsumerModule,
    defaultOutputDir,
    loadConfigFromFile
} from './config';
import { basename, dirname, extname, resolve } from 'node:path';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { exists } from './utils';
import { scssGenerator } from '@inkline/core';

type UserBuildOptions = ConfigurationOptions & {
    configFile?: string;
};

type BuildOptions = Required<UserBuildOptions> & {
    configDir: string;
    configExtName: string;
};

export function getResolvedBuildOptions(options: UserBuildOptions): BuildOptions {
    let configDir = process.cwd();
    let configFile = defaultConfigFileBasename;
    let configExtName = defaultConfigFileExtName;

    if (options.configFile) {
        configDir = dirname(options.configFile);
        configExtName = extname(options.configFile);
        configFile = basename(options.configFile, configExtName);
    } else {
        if (existsSync(resolve(configDir, `${configFile}.js`))) {
            configExtName = '.js';
        }
    }

    const buildModule = options.module ?? defaultConsumerModule;
    const outputDir = options.outputDir ?? resolve(configDir, defaultOutputDir);
    const manifest = options.manifest ?? false;

    return {
        configDir,
        configFile,
        configExtName,
        module: buildModule,
        outputDir,
        manifest
    };
}

export async function build(userOptions: UserBuildOptions = {}) {
    /**
     * Load configuration
     */

    const options = getResolvedBuildOptions(userOptions);
    const configuration = await loadConfigFromFile({
        cwd: options.configDir,
        configFile: `${options.configFile}${options.configExtName}`
    });
    configuration.options = options;

    // Create output directory
    if (!(await exists(options.outputDir))) {
        await mkdir(options.outputDir, { recursive: true });
    }

    // Generate output files data
    const outputFiles = scssGenerator(configuration);

    // Write output files
    const outputFilePromises: Promise<void>[] = [];
    for (const file of outputFiles) {
        const filePath = resolve(options.outputDir, file.path);
        const fileDir = dirname(filePath);

        if (!(await exists(fileDir))) {
            await mkdir(fileDir, { recursive: true });
        }

        outputFilePromises.push(writeFile(filePath, file.content, 'utf-8'));
    }

    // Write manifest file
    outputFilePromises.push(
        writeFile(
            resolve(options.outputDir, 'manifest.json'),
            JSON.stringify(configuration.themes, null, 4)
        )
    );

    await Promise.all(outputFilePromises);

    return configuration;
}
