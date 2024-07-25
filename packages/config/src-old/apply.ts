import {
    ClassificationType,
    BuildChunk,
    GeneratorMeta,
    GeneratorPriority,
    RawTheme,
    ResolvedTheme,
    ResolverMeta,
    OutputModifier,
    OutputModifierMeta
} from './types';
import { getSortedVariantsFieldKeys, isInternalKey, isTypedObject, matchKey } from './utils';
import { genericFieldGenerator } from './modules';

type ApplyOptions = {
    multiple: boolean;
    allowGenericGenerator?: boolean;
};

export function getMatchingTransformers<
    T extends {
        key?: string | string[] | RegExp | RegExp[];
        ignore?: string | string[] | RegExp | RegExp[];
        type?: ClassificationType;
    }
>(transformers: T[], value: unknown, path: string[]): T[] {
    return transformers.filter((transformer) => {
        const matchKeys = transformer.key
            ? Array.isArray(transformer.key)
                ? transformer.key
                : [transformer.key]
            : [];
        const isKeyMatch = !!matchKeys.find((key) => matchKey(path.join('.'), key));

        const isTypeMatch =
            transformer.type && isTypedObject(value) && transformer.type === value.__type;

        let isIgnored = false;
        if (transformer.ignore) {
            const ignoreKeys = Array.isArray(transformer.ignore)
                ? transformer.ignore
                : [transformer.ignore];
            isIgnored = !!ignoreKeys.find((key) => matchKey(path.join('.'), key));
        }

        return (isKeyMatch || isTypeMatch) && !isIgnored;
    });
}

export function applyResolvers<
    RawValue extends Record<string, any> = RawTheme,
    ResolvedValue extends Record<string, any> = ResolvedTheme
>(object: RawValue, meta: ResolverMeta, options: ApplyOptions = { multiple: true }): ResolvedValue {
    return Object.entries(object).reduce<ResolvedValue>((acc, [key, value]) => {
        if (isInternalKey(key)) {
            acc[key as keyof ResolvedValue] = value as ResolvedValue[keyof ResolvedValue];
            return acc;
        }

        const currentPath = [...meta.path, key];
        const resolvers = getMatchingTransformers(meta.resolvers, value, currentPath);

        if (resolvers.length > 0) {
            (options.multiple ? resolvers : resolvers.slice(0, 1)).forEach((resolver) => {
                acc[key as keyof ResolvedValue] = resolver.resolve(value, {
                    ...meta,
                    path: currentPath
                }) as ResolvedValue[keyof ResolvedValue];
            });
        } else if (typeof value === 'object') {
            acc[key as keyof ResolvedValue] = applyResolvers(
                value as RawValue[keyof RawValue],
                {
                    ...meta,
                    path: currentPath
                },
                options
            );
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
    const sortedKeys = getSortedVariantsFieldKeys(object);

    sortedKeys.forEach((key) => {
        const value = object[key] as unknown;
        if (isInternalKey(key)) {
            return;
        }

        const currentPath = [...meta.path, key];
        const generators = getMatchingTransformers(meta.generators, value, currentPath);

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
                    value as ResolvedValue[keyof ResolvedValue],
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
): BuildChunk[] {
    const chunks: BuildChunk[] = [];
    const sortedKeys = getSortedVariantsFieldKeys(object);

    sortedKeys.forEach((key) => {
        const value = object[key] as ResolvedValue[keyof ResolvedValue];
        if (isInternalKey(key)) {
            return;
        }

        const currentPath = [...meta.path, key];
        const generators = getMatchingTransformers(meta.generators, value, currentPath);
        const allowGenericGenerator =
            options.allowGenericGenerator && (generators.length === 0 || generators[0].sideEffects);

        if (generators.length > 0) {
            (options.multiple ? generators : generators.slice(0, 1)).forEach((generator) => {
                chunks.push({
                    path: currentPath,
                    output: generator.output,
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
                    value as ResolvedValue[keyof ResolvedValue],
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
                output: genericFieldGenerator.output,
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

export function createOutputModifiersApplier(key: keyof OutputModifier) {
    return (chunks: BuildChunk[], outputModifiers: OutputModifier[], meta: OutputModifierMeta) => {
        return chunks.reduce<BuildChunk[]>((acc, chunk) => {
            const modifiedChunk = outputModifiers.reduce<BuildChunk>((acc, modifier) => {
                return {
                    ...acc,
                    ...(modifier[key] ? { [key]: modifier[key]?.(acc, meta) ?? acc[key] } : {})
                };
            }, chunk);

            return [...acc, modifiedChunk];
        }, []);
    };
}

export const applyOutputPathModifiers = createOutputModifiersApplier('path');
export const applyOutputContentModifiers = createOutputModifiersApplier('content');
