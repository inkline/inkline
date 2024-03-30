import {
    AggregatorFile,
    AggregatorMeta,
    GeneratorChunk,
    GeneratorMeta,
    GeneratorPriority,
    RawTheme,
    ResolvedTheme,
    ResolverMeta
} from './types';
import { matchKey } from './utils';

type ApplyOptions = {
    multiple: boolean;
};

export function applyResolvers<
    RawValue extends Record<string, any> = RawTheme,
    ResolvedValue extends Record<string, any> = ResolvedTheme
>(object: RawValue, meta: ResolverMeta, options: ApplyOptions = { multiple: true }): ResolvedValue {
    return Object.entries(object).reduce<ResolvedValue>((acc, [key, value]) => {
        const currentPath = [...meta.path, key];
        const resolvers = meta.resolvers.filter((resolver) =>
            matchKey(currentPath.join('.'), resolver.key)
        );

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
    options: ApplyOptions = { multiple: true }
): string[] {
    const lines: string[] = [];

    Object.entries(object).forEach(([key, value]) => {
        const currentPath = [...meta.path, key];
        const generators = meta.generators.filter((resolver) =>
            matchKey(currentPath.join('.'), resolver.key)
        );

        if (generators.length > 0) {
            (options.multiple ? generators : generators.slice(0, 1)).forEach((generator) => {
                lines.push(
                    ...generator.generate(value, {
                        ...meta,
                        path: currentPath
                    })
                );
            });
        } else if (typeof value === 'object') {
            lines.push(
                ...applyGenerators<ResolvedValue[keyof ResolvedValue]>(
                    value,
                    {
                        ...meta,
                        path: currentPath
                    },
                    options
                )
            );
        }
    });

    return lines;
}

export function applyChunkGenerators<ResolvedValue extends Record<string, any> = ResolvedTheme>(
    object: ResolvedValue,
    meta: GeneratorMeta,
    options: ApplyOptions = { multiple: true }
): GeneratorChunk[] {
    const chunks: GeneratorChunk[] = [];

    Object.entries(object).forEach(([key, value]) => {
        const currentPath = [...meta.path, key];
        const generators = meta.generators.filter((resolver) =>
            matchKey(currentPath.join('.'), resolver.key)
        );

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
        } else if (typeof value === 'object') {
            chunks.push(
                ...applyChunkGenerators<ResolvedValue[keyof ResolvedValue]>(
                    value,
                    {
                        ...meta,
                        path: currentPath
                    },
                    options
                )
            );
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
            (file) => file.path.join('/') === resolvedFilePath.join('/')
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
