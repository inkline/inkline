import {
    AggregatorFile,
    AggregatorMeta,
    ClassifierMeta,
    ClassifierType,
    GeneratorChunk,
    GeneratorMeta,
    GeneratorPriority,
    RawTheme,
    ResolvedTheme,
    ResolverMeta
} from './types';
import { getSortedVariantsFieldKeys, matchKey } from './utils';
import { genericFieldGenerator } from './generators';

type ApplyOptions = {
    multiple: boolean;
    allowGenericGenerator?: boolean;
};

export function getMatchingTransformers<
    T extends {
        key: string | string[] | RegExp | RegExp[];
        ignore?: string | string[] | RegExp | RegExp[];
    }
>(transformers: T[], path: string[]): T[] {
    return transformers.filter((transformer) => {
        const matchKeys = Array.isArray(transformer.key) ? transformer.key : [transformer.key];
        const isMatch = !!matchKeys.find((key) => matchKey(path.join('.'), key));

        let isIgnored = false;
        if (transformer.ignore) {
            const ignoreKeys = Array.isArray(transformer.ignore)
                ? transformer.ignore
                : [transformer.ignore];
            isIgnored = !!ignoreKeys.find((key) => matchKey(path.join('.'), key));
        }

        return isMatch && !isIgnored;
    });
}

export function applyClassifiers<RawValue extends Record<string, any> = RawTheme>(
    object: RawValue,
    meta: ClassifierMeta,
    options: ApplyOptions = { multiple: true }
): RawValue {
    return Object.entries(object).reduce<RawValue>((acc, [key, value]) => {
        const currentPath = [...meta.path, key];
        const classifiers = getMatchingTransformers(meta.classifiers, currentPath);

        acc[key as keyof RawValue] = value as RawValue[keyof RawValue];
        if (key.startsWith('$')) {
            return acc;
        }

        if (classifiers.length > 0) {
            (options.multiple ? classifiers : classifiers.slice(0, 1)).forEach((classifier) => {
                acc[key as keyof RawValue] = classifier.classify(acc[key as keyof RawValue], {
                    ...meta,
                    path: currentPath
                }) as RawValue[keyof RawValue];
            });
        }

        if (typeof acc[key] === 'object') {
            if (!Array.isArray(value)) {
                acc[key as keyof RawValue] = applyClassifiers<RawValue[keyof RawValue]>(
                    acc[key],
                    {
                        ...meta,
                        path: currentPath
                    },
                    options
                ) as RawValue[keyof RawValue];
            }
        }

        return acc;
    }, {} as RawValue);
}

export function applyResolvers<
    RawValue extends Record<string, any> = RawTheme,
    ResolvedValue extends Record<string, any> = ResolvedTheme
>(object: RawValue, meta: ResolverMeta, options: ApplyOptions = { multiple: true }): ResolvedValue {
    return Object.entries(object).reduce<ResolvedValue>((acc, [key, value]) => {
        if (key.startsWith('$')) {
            acc[key as keyof ResolvedValue] = value as ResolvedValue[keyof ResolvedValue];
            return acc;
        }

        const currentPath = [...meta.path, key];
        const resolvers = getMatchingTransformers(meta.resolvers, currentPath);

        if (resolvers.length > 0) {
            (options.multiple ? resolvers : resolvers.slice(0, 1)).forEach((resolver) => {
                acc[key as keyof ResolvedValue] = resolver.resolve(value, {
                    ...meta,
                    path: currentPath
                }) as ResolvedValue[keyof ResolvedValue];
            });
        } else if (typeof value === 'object') {
            acc[key as keyof ResolvedValue] = applyResolvers<
                RawValue[keyof RawValue],
                ResolvedValue[keyof ResolvedValue]
            >(
                value,
                {
                    ...meta,
                    path: currentPath
                },
                options
            ) as ResolvedValue[keyof ResolvedValue];
        } else {
            acc[key as keyof ResolvedValue] = value as ResolvedValue[keyof ResolvedValue];
        }

        return acc;
    }, {} as ResolvedValue);
}

export function applyGenerators<ResolvedValue extends Record<string, any> = ResolvedTheme>(
    object: ResolvedValue,
    meta: GeneratorMeta,
    options: ApplyOptions = { multiple: true, allowGenericGenerator: true }
): string[] {
    const lines: string[] = [];

    getSortedVariantsFieldKeys(object).forEach((key) => {
        const value = object[key];
        if (key.startsWith('$')) {
            return;
        }

        const currentPath = [...meta.path, key];
        const generators = getMatchingTransformers(meta.generators, currentPath);

        if (generators.length > 0) {
            (options.multiple ? generators : generators.slice(0, 1)).forEach((generator) => {
                lines.push(
                    ...generator.generate(value, {
                        ...meta,
                        path: currentPath
                    })
                );
            });
        }

        if (typeof value === 'object') {
            lines.push(
                ...applyGenerators<ResolvedValue[keyof ResolvedValue]>(
                    value,
                    {
                        ...meta,
                        path: currentPath
                    },
                    {
                        ...options,
                        allowGenericGenerator:
                            options.allowGenericGenerator && generators.length === 0
                    }
                )
            );
        } else if (options.allowGenericGenerator && generators.length === 0) {
            lines.push(
                ...genericFieldGenerator.generate(value, {
                    ...meta,
                    path: currentPath
                })
            );
        }
    });

    return lines;
}

export function applyChunkGenerators<ResolvedValue extends Record<string, any> = ResolvedTheme>(
    object: ResolvedValue,
    meta: GeneratorMeta,
    options: ApplyOptions = { multiple: true, allowGenericGenerator: true }
): GeneratorChunk[] {
    const chunks: GeneratorChunk[] = [];
    const sortedKeys = getSortedVariantsFieldKeys(object);

    sortedKeys.forEach((key) => {
        const value = object[key];
        if (key.startsWith('$')) {
            return;
        }

        const currentPath = [...meta.path, key];
        const generators = getMatchingTransformers(meta.generators, currentPath);
        const allowGenericGenerator =
            options.allowGenericGenerator && (generators.length === 0 || generators[0].sideEffects);

        if (generators.length > 0) {
            (options.multiple ? generators : generators.slice(0, 1)).forEach((generator) => {
                chunks.push({
                    path: currentPath,
                    type: generator.type,
                    priority: generator.priority ?? GeneratorPriority.Low,
                    content: generator.generate(value, {
                        ...meta,
                        path: currentPath
                    })
                });
            });
        }

        if (typeof value === 'object' && !Array.isArray(value)) {
            chunks.push(
                ...applyChunkGenerators<ResolvedValue[keyof ResolvedValue]>(
                    value,
                    {
                        ...meta,
                        path: currentPath
                    },
                    {
                        ...options,
                        allowGenericGenerator
                    }
                )
            );
        } else if (allowGenericGenerator) {
            chunks.push({
                path: currentPath.length > 0 ? currentPath : ['generic'],
                type: genericFieldGenerator.type,
                priority: genericFieldGenerator.priority ?? GeneratorPriority.Low,
                content: genericFieldGenerator.generate(value, {
                    ...meta,
                    path: currentPath
                })
            });
        }
    });

    return chunks;
}

export function applyAggregators(chunks: GeneratorChunk[], meta: AggregatorMeta): AggregatorFile[] {
    const files: AggregatorFile[] = [];

    chunks.forEach((chunk) => {
        const aggregator = meta.aggregators.find((aggregator) => aggregator.type === chunk.type);

        const resolvedFilePath = aggregator?.aggregate.path(chunk.path, meta) || chunk.path;
        const existingFile = files.find(
            (file) => file.path.join('/') === resolvedFilePath.join('/') && file.type === chunk.type
        );

        if (existingFile) {
            existingFile.content.push(...chunk.content);
        } else {
            files.push({
                path: resolvedFilePath,
                type: chunk.type,
                priority: chunk.priority,
                content: chunk.content
            });
        }
    });

    files.forEach((file) => {
        const aggregator = meta.aggregators.find((aggregator) => aggregator.type === file.type);

        file.content = aggregator?.aggregate.content(file.content, meta) || file.content;
    });

    return files;
}
