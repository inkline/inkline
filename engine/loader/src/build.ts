import type { Configuration } from '@inkline/core';
import { createContext } from '@inkline/core';
import { BuildOptions, UserBuildOptions } from './types';
import {
    defaultConfigFileBasename,
    defaultConfigFileExtname,
    defaultConsumerModule,
    defaultOutputDir,
    loadConfigFromFile
} from './load';
import { basename, dirname, extname, resolve } from 'node:path';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { exists } from './utils';
import { generator } from '@inkline/generator';

export function getResolvedBuildOptions(options: UserBuildOptions): BuildOptions {
    let configDir = process.cwd();
    let configBasename = defaultConfigFileBasename;
    let configExtname = defaultConfigFileExtname;

    if (options.configFile) {
        configDir = dirname(options.configFile);
        configExtname = extname(options.configFile);
        configBasename = basename(options.configFile, configExtname);
    } else {
        if (existsSync(resolve(configDir, `${configBasename}.js`))) {
            configExtname = '.js';
        }
    }

    const buildModule = options.module ?? defaultConsumerModule;
    const outputDir = options.outputDir ?? resolve(configDir, defaultOutputDir);
    const manifest = options.manifest ?? false;

    const configFile = `${configBasename}${configExtname}`;
    const configPath = resolve(configDir, configFile);

    return {
        context: createContext(),
        generator: {},
        ...options,
        configPath,
        configDir,
        configFile,
        configBasename,
        configExtname,
        module: buildModule,
        outputDir,
        manifest
    };
}

export async function build(userOptions: UserBuildOptions = {}) {
    const options = getResolvedBuildOptions(userOptions);

    // Load configuration
    const configuration = await loadConfigFromFile({
        cwd: options.configDir,
        configFile: options.configPath,
        defaults: {
            context: options.context,
            options: {}
        }
    });

    return await buildConfiguration(configuration, {
        ...configuration.options,
        ...options
    });
}

export async function buildConfiguration(configuration: Configuration, options: BuildOptions) {
    // Create output directory
    if (!(await exists(options.outputDir))) {
        await mkdir(options.outputDir, { recursive: true });
    }

    // Generate output files data
    const outputFiles = generator(configuration.context, options.generator);

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
            JSON.stringify(
                configuration.context.themes,
                (key, value: unknown) => (key === '__id' ? undefined : value),
                4
            )
        )
    );

    await Promise.all(outputFilePromises);

    return configuration;
}
