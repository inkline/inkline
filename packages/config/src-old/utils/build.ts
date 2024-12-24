import {
    DEFAULT_CONFIG_EXT,
    DEFAULT_CONFIG_FILE,
    DEFAULT_OUTPUT_DIR,
    DEFAULT_OUTPUT_EXTNAME,
    DEFAULT_THEME_SELECTOR
} from '../constants';
import { basename, dirname, extname, resolve } from 'pathe';
import {
    BuildOptions,
    ClassificationType,
    BuildChunk,
    GeneratorMeta,
    GeneratorPriority,
    IndexFile,
    ResolvedBuildOptions
} from '../types';
import { existsSync } from 'fs';
import { filterPathByClassification } from './meta';

export function getResolvedBuildOptions(options: BuildOptions): ResolvedBuildOptions {
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

export const chunkToFilePathAllowlist = ['generic', 'mixins', 'layers', 'columns'];

export function convertChunkPathToFilePath(meta: GeneratorMeta): BuildChunk['path'] {
    return filterPathByClassification(meta, (path, part, ctx) => {
        return (
            [
                ClassificationType.Group,
                ClassificationType.Variable,
                ClassificationType.Element
            ].includes(ctx.type) || chunkToFilePathAllowlist.includes(part)
        );
    }).slice(0, 2);
}

export function extractIndexFiles<T extends { path: string[]; priority?: GeneratorPriority }>(
    items: T[]
): IndexFile[] {
    const result = items.reduce<Record<string, IndexFile>>((acc, obj) => {
        const path = obj.path;
        for (let i = 0; i < path.length; i++) {
            const subPath = path.slice(0, i);
            const subPathStr = subPath.join('/');
            const importItem = path[i];
            if (acc[subPathStr]) {
                if (!acc[subPathStr]?.import.includes(importItem)) {
                    acc[subPathStr].import.push(importItem);
                }
            } else {
                acc[subPathStr] = { path: subPath, import: [importItem] };
            }
        }
        return acc;
    }, {});

    const results = Object.values(result);

    for (const result of results) {
        result.import.sort((a, b) => {
            const aPriority =
                items.find((item) => item.path.join('/') === [...result.path, a].join('/'))
                    ?.priority ?? GeneratorPriority.Lowest;
            const bPriority =
                items.find((item) => item.path.join('/') === [...result.path, b].join('/'))
                    ?.priority ?? GeneratorPriority.Lowest;

            return bPriority - aPriority;
        });
    }

    return results;
}
