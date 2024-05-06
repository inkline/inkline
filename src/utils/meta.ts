import { ClassifierType, GeneratorMeta } from '../types';
import { traversePathByClassification } from './path';

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
        return ![ClassifierType.EntityVariants, ClassifierType.PrimitiveVariants].some(
            (type) => ctx.typePath.includes(type) || ctx.type === type
        );
    }).length;

    return indexOffset > 0 ? meta.path.slice(indexOffset) : meta.path;
}
