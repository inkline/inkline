import {
    ClassificationType,
    BuildChunk,
    GeneratorMeta,
    ResolvedTheme,
    ResolverMeta
} from '../types';
import { isConsumableObject, isTypedObject } from './typeGuards';
import { toKebabCase } from './string';

export function shouldGenerateAggregateValue(meta: GeneratorMeta) {
    return isDefaultTheme(meta.themeName) && !isEntityPath(meta.path);
}

export function isDefaultTheme(themeName: string) {
    return themeName === 'default';
}

export function isEntityPath(path: string[]) {
    return path.find((part) => ['components', 'elements'].includes(part));
}

export function getResolvedPath(meta: GeneratorMeta) {
    const indexOffset = traversePathByClassification(meta, (path, part, ctx) => {
        return ![ClassificationType.Element, ClassificationType.Variable].some(
            (type) => ctx.typePath.includes(type) || ctx.type === type
        );
    }).length;

    return indexOffset > 0 ? meta.path.slice(indexOffset) : meta.path;
}

export type TraversePathByClassificationFnContext = {
    type: ClassificationType;
    typePath: ClassificationType[];
    consume: boolean;
};

export type TraversePathByClassificationFn = (
    path: string[],
    part: string,
    ctx: TraversePathByClassificationFnContext
) => boolean;

export function traversePathByClassification(
    meta: GeneratorMeta | ResolverMeta,
    fn: TraversePathByClassificationFn
): BuildChunk['path'] {
    const { theme, path } = meta;
    const chunkPath: string[] = [];
    const typePath: TraversePathByClassificationFnContext['typePath'] = [];

    let schema = theme as ResolvedTheme;
    path.forEach((part) => {
        schema = schema[part as keyof ResolvedTheme] as unknown as ResolvedTheme;

        const schemaType = isTypedObject(schema) ? schema.__type : ClassificationType.Unknown;
        const isSchemaKeyConsumed = isConsumableObject(schema) ? !!schema.__consume : false;

        if (fn(path, part, { type: schemaType, consume: isSchemaKeyConsumed, typePath })) {
            chunkPath.push(toKebabCase(part));
        }

        typePath.push(schemaType);
    });

    return chunkPath;
}
