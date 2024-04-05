import {
    GenerateValueFn,
    Generator,
    GeneratorMeta,
    ResolvedThemeVariantsWithDefault
} from '../types';
import { codegenCssVariables, getCssVariableNamePreamble } from './codegen';
import { toKebabCase } from './string';
import { getResolvedPath, shouldGenerateAggregateValue } from './meta';

export function defineGenerator<Resolved>(generator: Generator<Resolved>): Generator<Resolved> {
    return generator;
}

export function defineGeneratorValueFn<ResolvedValue>(
    fn: GenerateValueFn<ResolvedValue>
): GenerateValueFn<ResolvedValue> {
    return fn;
}

export const getSortedFieldWithVariantsKeys = (variants: Record<string, unknown>): string[] => {
    const sortedKeys = Object.keys(variants);

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

export const createFieldWithVariantsGenerateFn =
    <ResolvedValue>(generateValue: GenerateValueFn<ResolvedValue>) =>
    (variants: ResolvedThemeVariantsWithDefault<ResolvedValue>, meta: GeneratorMeta): string[] => {
        const sortedKeys = getSortedFieldWithVariantsKeys(variants);

        return sortedKeys.reduce<string[]>((acc, variantName) => {
            const variant = variants[variantName];
            acc.push(...generateValue(variant, { ...meta, path: [...meta.path, variantName] }));

            return acc;
        }, []);
    };

export const createFieldWithoutVariantsGenerateFn =
    <ResolvedValue>(generateValue: GenerateValueFn<ResolvedValue>) =>
    (value: ResolvedValue, meta: GeneratorMeta): string[] => {
        return generateValue(value, meta);
    };

export const createMultipleFieldsWithVariantsGenerateFn =
    <ResolvedValue>(generateValue: GenerateValueFn<ResolvedValue>) =>
    (
        fields: Record<string, ResolvedThemeVariantsWithDefault<ResolvedValue>>,
        meta: GeneratorMeta
    ) => {
        return Object.entries(fields).reduce<string[]>((acc, [fieldName, fieldOrVariants]) => {
            acc.push(
                ...createFieldWithVariantsGenerateFn(generateValue)(fieldOrVariants, {
                    ...meta,
                    path: [...meta.path, fieldName]
                })
            );

            return acc;
        }, []);
    };

export const createGenericDesignTokenVariantGenerateFn =
    <ResolvedValue extends Record<string, any> | string | number>(options?: {
        key?: string;
        aggregate?: string[];
        replacePath?: (path: string[]) => string[];
    }) =>
    (value: ResolvedValue, meta: GeneratorMeta): string[] => {
        let path = getResolvedPath(meta);
        const aggregateVariables: string[] = [];

        if (options?.replacePath) {
            path = options.replacePath(path);
        }

        let cssVariableNameParts = path.map((part) => toKebabCase(part));
        const keyIndex = cssVariableNameParts.indexOf(options?.key ?? '');
        if (keyIndex !== -1 && path.length > 2) {
            cssVariableNameParts = cssVariableNameParts.slice(keyIndex);
        }

        const variableNamePreamble = getCssVariableNamePreamble(path);
        const variantName = cssVariableNameParts.pop() || '';
        const propertyName = cssVariableNameParts.pop() || '';
        const rootCssVariableName = `${variableNamePreamble}${propertyName}${variantName === 'default' ? '' : `${propertyName ? '-' : ''}${variantName}`}`;

        if (typeof value === 'string' || typeof value === 'number') {
            return [codegenCssVariables.set(rootCssVariableName, `${value}`)];
        }

        const sortedKeys = getSortedFieldWithVariantsKeys(value);
        const lines = sortedKeys.reduce<string[]>((acc, key) => {
            const cssVariableValue = value[key];
            const cssVariableName = `${variableNamePreamble}${propertyName}-${toKebabCase(key)}${variantName === 'default' ? '' : `-${variantName}`}`;

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
