import type { GeneratorMeta } from '../types';
import {
    codegenCssVariables,
    getCssVariablePreamblePath,
    getCssVariablePreamble,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName
} from './codegen';
import { toKebabCase } from './string';
import { getResolvedPath, shouldGenerateAggregateValue } from './meta';
import { isInternalKey } from './matchKey';

export const getSortedVariantsFieldKeys = <Value extends Record<string, unknown>>(
    variants: Value
): string[] => {
    const sortedKeys = Object.keys(variants).filter((key) => !isInternalKey(key));

    sortedKeys.sort((variantName) => {
        const variant = variants[variantName];
        const isReference = typeof variant === 'string' && variant.includes('var');
        const isDefault = variantName === 'default';

        if (isDefault) {
            return isReference ? 1 : -1;
        }

        return 0;
    });

    return sortedKeys;
};

export const createGenericVariantGenerateFn =
    <ResolvedValue extends Record<string, any> | string | number>(options?: {
        aggregate?: string[];
        replacePath?: (path: string[]) => string[];
    }) =>
    (value: ResolvedValue, meta: GeneratorMeta): string[] => {
        let path = getResolvedPath(meta);
        const aggregateVariables: string[] = [];

        if (options?.replacePath) {
            path = options.replacePath(path);
        }

        const variablePreamblePath = getCssVariablePreamblePath(meta);
        const variablePreamble = getCssVariablePreamble(variablePreamblePath);

        const variantName = getCssVariableVariantName(meta);
        const resolvedVariantName = getResolvedCssVariableVariantName(variantName);
        const propertyName = toKebabCase(
            variablePreamblePath.length > 0 ? path[path.length - 1] : path[path.length - 2]
        );

        const rootCssVariableName = `${variablePreamble}${propertyName}${resolvedVariantName}`;

        if (typeof value === 'string' || typeof value === 'number') {
            return [codegenCssVariables.set(rootCssVariableName, `${value}`)];
        }

        const sortedKeys = getSortedVariantsFieldKeys(value);
        const lines = sortedKeys.reduce<string[]>((acc, key) => {
            if (isInternalKey(key)) {
                return acc;
            }

            const cssVariableValue = value[key] as string;
            const cssVariableName = `${variablePreamble}${propertyName}-${toKebabCase(key)}${variantName === 'default' ? '' : `-${variantName}`}`;

            if (typeof cssVariableValue !== 'undefined') {
                acc.push(codegenCssVariables.set(cssVariableName, cssVariableValue));

                if (options?.aggregate?.includes(key)) {
                    aggregateVariables.push(codegenCssVariables.get(cssVariableName));
                }
            }

            return acc;
        }, []);

        if (
            (options?.aggregate ?? []).length > 0 &&
            aggregateVariables.length > 0 &&
            shouldGenerateAggregateValue(meta)
        ) {
            lines.push(codegenCssVariables.set(rootCssVariableName, aggregateVariables.join(' ')));
        }

        return lines;
    };
