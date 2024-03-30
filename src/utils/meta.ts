import type { GeneratorMeta } from '../types';

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
    const indexOffset = meta.path.findIndex((part) =>
        ['components', 'elements', 'typography'].includes(part)
    );

    return indexOffset !== -1 ? meta.path.slice(indexOffset + 1) : meta.path;
}
