import {
    ClassifierType,
    GeneratorChunk,
    GeneratorMeta,
    ResolvedTheme,
    ResolverMeta
} from '../types';
import { toKebabCase } from './string';

export type TraversePathByClassificationFn = (
    path: string[],
    part: string,
    ctx: {
        type: ClassifierType;
        typePath: ClassifierType[];
        ignoreKey: boolean;
    }
) => boolean;

export function traversePathByClassification(
    meta: GeneratorMeta | ResolverMeta,
    fn: TraversePathByClassificationFn
): GeneratorChunk['path'] {
    const { theme, path } = meta;
    const chunkPath: string[] = [];
    const typePath: ClassifierType[] = [];

    let schema: ResolvedTheme | ResolvedTheme[keyof ResolvedTheme] = theme as ResolvedTheme;
    path.forEach((part, index) => {
        schema = (schema as ResolvedTheme)[
            part as keyof ResolvedTheme
        ] as ResolvedTheme[keyof ResolvedTheme];

        const schemaType = (schema as unknown as { $type: ClassifierType })?.$type;
        const isSchemaKeyIgnored = (schema as unknown as { $ignoreKey: boolean })?.$ignoreKey;

        if (fn(path, part, { type: schemaType, ignoreKey: isSchemaKeyIgnored, typePath })) {
            chunkPath.push(toKebabCase(part));
        }

        typePath.push(schemaType);
    });

    return chunkPath;
}
