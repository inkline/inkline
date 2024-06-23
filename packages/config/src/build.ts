import { loadConfigurationFromFile } from './load';
import {
    BuildChunk,
    BuildOptions,
    GeneratorMeta,
    OutputModifierMeta,
    ResolvedBuildOptions,
    ResolvedConfiguration
} from './types';
import {
    exists,
    getResolvedBuildOptions,
    interpolate,
    convertChunkPathToFilePath,
    toKebabCase,
    extractIndexFiles
} from './utils';
import { dirname, resolve } from 'pathe';
import { mkdir, writeFile } from 'fs/promises';
import prettier from 'prettier';
import {
    applyChunkGenerators,
    applyOutputContentModifiers,
    applyOutputPathModifiers
} from './apply';

/**
 * Load configuration, resolve and generate CSS files.
 *
 * @param options Build options.
 */

export async function build(options: BuildOptions = {}): Promise<{
    options: ResolvedBuildOptions;
    config: ResolvedConfiguration;
    filePaths: string[];
    fileContents: string[];
}> {
    /**
     * Load configuration
     */

    const buildOptions = getResolvedBuildOptions(options);
    const configuration = await loadConfigurationFromFile({
        cwd: buildOptions.configDir,
        configFile: `${buildOptions.configFile}${buildOptions.configExtName}`
    });

    /**
     * Create output directory
     */

    if (!(await exists(buildOptions.outputDir))) {
        await mkdir(buildOptions.outputDir, { recursive: true });
    }

    const formatFileContentsPromises: Promise<string>[] = [];
    const mkdirPromises: Promise<string | undefined>[] = [];
    const writeFilePromises: Promise<void>[] = [];
    const filePaths: string[] = [];

    for (const themeName in configuration.themes) {
        const theme = configuration.themes[themeName];
        const themeSelector = interpolate(buildOptions.themeSelector, {
            themeName
        });
        const isDefaultTheme = themeName === 'default';

        /**
         * Create theme output directory
         */

        const themeOutputDir: string = isDefaultTheme
            ? buildOptions.outputDir
            : resolve(buildOptions.outputDir, themeName);
        if (!(await exists(themeOutputDir))) {
            await mkdir(themeOutputDir);
        }

        /**
         * Generate chunks
         */

        const generatorMeta: GeneratorMeta = {
            path: [],
            theme,
            themeName,
            generators: configuration.generators
        };
        let chunks = applyChunkGenerators(theme, generatorMeta).map((chunk) => ({
            ...chunk,
            path: convertChunkPathToFilePath({ ...generatorMeta, path: chunk.path })
        }));

        /**
         * Apply output path modifiers
         */

        const outputModifierMeta: OutputModifierMeta = {
            themeName,
            themeSelector
        };

        chunks = applyOutputPathModifiers(
            chunks,
            configuration.outputModifiers,
            outputModifierMeta
        );

        /**
         * Join chunks with the same path and type
         */

        chunks = chunks.reduce<BuildChunk[]>((acc, chunk) => {
            const existingChunk = acc.find(
                (c) => c.path.join('.') === chunk.path.join('.') && chunk.output === c.output
            );

            if (existingChunk) {
                existingChunk.content.push(...chunk.content);
            } else {
                acc.push(chunk);
            }

            return acc;
        }, []);

        /**
         * Apply output content modifiers
         */

        chunks = applyOutputContentModifiers(
            chunks,
            configuration.outputModifiers,
            outputModifierMeta
        );

        /**
         * Sort chunks by priority
         */

        chunks.sort((a, b) => a.priority - b.priority);

        /**
         * Join chunks with the same path regardless of type
         */

        chunks = chunks.reduce<BuildChunk[]>((acc, chunk) => {
            const existingFile = acc.find((c) => c.path.join('.') === chunk.path.join('.'));
            if (existingFile) {
                existingFile.content.push(...chunk.content);
            } else {
                acc.push(chunk);
            }

            return acc;
        }, []);

        /**
         * Create files
         */

        const files = chunks
            .map((chunk) => ({ path: chunk.path, content: chunk.content }))
            .concat(configuration.files);

        /**
         * Format file contents
         */

        for (const file of files) {
            const filePathParts = file.path.map((part) => toKebabCase(part));
            const filePath = `${resolve(themeOutputDir, ...filePathParts)}${buildOptions.extName}`;
            const fileDir = dirname(filePath);

            if (!(await exists(fileDir))) {
                mkdirPromises.push(mkdir(fileDir, { recursive: true }));
            }

            filePaths.push(filePath);
            formatFileContentsPromises.push(
                prettier.format(file.content.join('\n'), {
                    parser: 'scss'
                })
            );
        }

        /**
         * Generate index files
         */

        const indexFiles = extractIndexFiles(files);

        // Add all themes to the default theme index file
        if (themeName === 'default') {
            indexFiles[0].import.push(
                ...Object.keys(configuration.themes).filter((t) => t !== 'default')
            );
        }

        for (const indexFile of indexFiles) {
            const indexFilePath = resolve(
                themeOutputDir,
                ...indexFile.path,
                `index${buildOptions.extName}`
            );
            const indexFileContents = indexFile.import
                .map((importPath) => `@import './${importPath}';`)
                .join('\n');

            writeFilePromises.push(writeFile(indexFilePath, indexFileContents, 'utf-8'));
        }
    }

    /**
     * Write files
     */

    const fileContents = await Promise.all(formatFileContentsPromises);
    for (let i = 0; i < fileContents.length; i++) {
        writeFilePromises.push(writeFile(filePaths[i], fileContents[i], 'utf-8'));
    }

    /**
     * Write manifest
     */

    // if (resolvedOptions.manifest) {
    writeFilePromises.push(
        writeFile(
            resolve(buildOptions.outputDir, 'manifest.json'),
            JSON.stringify(configuration.themes, null, 4)
        )
    );
    // }

    await Promise.all(mkdirPromises);
    await Promise.all(writeFilePromises);

    return {
        options: buildOptions,
        config: configuration,
        filePaths,
        fileContents
    };
}
