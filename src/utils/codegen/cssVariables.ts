import { ClassifierType, GeneratorMeta } from '../../types';
import { traversePathByClassification } from '../path';
import { toKebabCase } from '../string';

export const codegenCssVariables = {
    set: (name: string, value: string) => `--${name}: ${value};`,
    get: (name: string, fallback?: string) => `var(--${name}${fallback ? `, ${fallback}` : ''})`
};

export function getCssVariablePreamblePath(meta: GeneratorMeta): string[] {
    return traversePathByClassification(meta, (path, part, ctx) => {
        const isIgnoredPath = ctx.ignoreKey;

        const isSubgroupPath = ctx.typePath.includes(ClassifierType.Group);
        const isGroupPath = ctx.type === ClassifierType.Group;

        const isPrimitiveVariantsPath =
            ctx.typePath.includes(ClassifierType.PrimitiveVariants) ||
            ctx.type === ClassifierType.PrimitiveVariants;

        const isEntityVariantsPath = ctx.type === ClassifierType.EntityVariants;
        const isEntityVariantsDirectChild =
            ctx.typePath[ctx.typePath.length - 1] === ClassifierType.EntityVariants;
        const isEntityVariantsChild =
            ctx.typePath.includes(ClassifierType.EntityVariants) && !isEntityVariantsDirectChild;

        return (
            isSubgroupPath &&
            !(
                isPrimitiveVariantsPath ||
                (isEntityVariantsDirectChild && part === 'default') ||
                (isEntityVariantsChild && !isGroupPath)
            ) &&
            !isIgnoredPath
        );
    }).map(toKebabCase);
}

export function getCssVariablePreamble(preamblePath: string[]): string {
    return preamblePath.length > 0 ? `${preamblePath.join('--')}--` : '';
}

export function getCssVariableName(meta: GeneratorMeta): string {
    return toKebabCase(meta.path[meta.path.length - 1]);
}

export function getCssVariableVariantName(meta: GeneratorMeta): string {
    const preamblePath = getCssVariablePreamblePath(meta);

    return preamblePath.length > 0 ? 'default' : getCssVariableName(meta);
}

export function getResolvedCssVariableVariantName(variantName: string): string {
    return variantName === 'default' ? '' : `-${variantName}`;
}
