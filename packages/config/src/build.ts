import { loadConfigurationFromFile } from './load';
import { applyAggregators, applyChunkGenerators } from './apply';
import {
    AggregatorFile,
    AggregatorMeta,
    BuildOptions,
    GeneratorMeta,
    GeneratorPriority,
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
    const resolvedOptions = getResolvedBuildOptions(options);

    const resolvedConfig = await loadConfigurationFromFile({
        cwd: resolvedOptions.configDir,
        configFile: `${resolvedOptions.configFile}${resolvedOptions.configExtName}`
    });

    if (!(await exists(resolvedOptions.outputDir))) {
        await mkdir(resolvedOptions.outputDir, { recursive: true });
    }

    const formatFileContentsPromises: Promise<string>[] = [];
    const mkdirPromises: Promise<string | undefined>[] = [];
    const writeFilePromises: Promise<void>[] = [];
    const filePaths: string[] = [];
    const indexFiles: Record<
        string,
        Array<{
            importPath: string;
            priority: GeneratorPriority;
        }>
    > = {};

    for (const themeName in resolvedConfig.themes) {
        const theme = resolvedConfig.themes[themeName];
        const themeSelector = interpolate(resolvedOptions.themeSelector, {
            themeName
        });
        const isDefaultTheme = themeName === 'default';

        const themeOutputDir: string = isDefaultTheme
            ? resolvedOptions.outputDir
            : resolve(resolvedOptions.outputDir, themeName);
        if (!(await exists(themeOutputDir))) {
            await mkdir(themeOutputDir);
        }

        const generatorMeta: GeneratorMeta = {
            path: [],
            theme,
            themeName,
            generators: resolvedConfig.generators
        };
        const chunks = applyChunkGenerators(theme, generatorMeta).map((chunk) => ({
            ...chunk,
            path: convertChunkPathToFilePath({ ...generatorMeta, path: chunk.path })
        }));

        const aggregatorMeta: AggregatorMeta = {
            themeName,
            themeSelector,
            aggregators: resolvedConfig.aggregators
        };
        const files = applyAggregators(chunks, aggregatorMeta);
        files.sort((a, b) => a.priority - b.priority);

        const resolvedFiles = files.reduce<AggregatorFile[]>(
            (acc, file) => {
                const existingFile = acc.find((f) => f.path.join('.') === file.path.join('.'));
                if (existingFile) {
                    existingFile.content.push(...file.content);
                } else {
                    acc.push(file);
                }

                return acc;
            },
            [...(resolvedConfig.dependencies as AggregatorFile[])]
        );

        for (const file of resolvedFiles) {
            const filePathParts = file.path.map((part) => toKebabCase(part));
            const filePath = `${resolve(themeOutputDir, ...filePathParts)}${resolvedOptions.extName}`;
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

        const indexFiles = extractIndexFiles(resolvedFiles);

        if (themeName === 'default') {
            indexFiles[0].import.push(
                ...Object.keys(resolvedConfig.themes).filter((t) => t !== 'default')
            );
        }

        for (const indexFile of indexFiles) {
            const indexFilePath = resolve(
                themeOutputDir,
                ...indexFile.path,
                `index${resolvedOptions.extName}`
            );
            const indexFileContents = indexFile.import
                .map((importPath) => `@import './${importPath}';`)
                .join('\n');

            writeFilePromises.push(writeFile(indexFilePath, indexFileContents, 'utf-8'));
        }
    }

    const fileContents = await Promise.all(formatFileContentsPromises);
    for (let i = 0; i < fileContents.length; i++) {
        writeFilePromises.push(writeFile(filePaths[i], fileContents[i], 'utf-8'));
    }

    // if (resolvedOptions.manifest) {
    writeFilePromises.push(
        writeFile(
            resolve(resolvedOptions.outputDir, 'manifest.json'),
            JSON.stringify(resolvedConfig.themes, null, 4)
        )
    );
    // }

    await Promise.all(mkdirPromises);
    await Promise.all(writeFilePromises);

    return {
        options: resolvedOptions,
        config: resolvedConfig,
        filePaths,
        fileContents
    };
}
