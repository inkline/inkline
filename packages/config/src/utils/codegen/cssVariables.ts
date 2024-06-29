import { ClassificationType, GeneratorMeta } from '../../types';
import { filterPathByClassification } from '../meta';
import { toKebabCase } from '../string';

export const codegenCssVariables = {
    set: (name: string, value: string) => `--${name}: ${value};`,
    get: (name: string, fallback?: string) => `var(--${name}${fallback ? `, ${fallback}` : ''})`
};

export function getCssVariablePreamblePath(meta: GeneratorMeta): string[] {
    return filterPathByClassification(meta, (path, part, { type, typePath, consume }) => {
        const isElementVariant =
            [ClassificationType.Element].includes(typePath[typePath.length - 1]) &&
            part !== 'default';

        return (
            consume ||
            [ClassificationType.Element, ClassificationType.ChildElement].includes(type) ||
            isElementVariant
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
