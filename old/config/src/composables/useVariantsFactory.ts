import {
    DefinitionOptions,
    ExportedName,
    Reference,
    RenameFn,
    TokenValue,
    Variable
} from '../types';
import { ref, variable } from '../tokens';
import { toCamelCase } from '../utils';
import { defaultDefinitionOptions, defaultRenameFn } from '../constants';

/**
 * Types
 */

export type VariantsReturnKey<
    RootKeys extends string,
    VariantKeys extends string
> = ExportedName<`${RootKeys}-${VariantKeys}`>;

export type ApplyVariantFn = (current: Reference) => TokenValue;

/**
 * Type definition functions
 */

export function createVariantFactoryFn(fn: ApplyVariantFn) {
    return fn;
}

/**
 * Creates derived variables for each variant based on the target variable
 */
export function useVariantsFactory<RootKey extends string, VariantKeys extends string>(
    target: Variable,
    variantsMap: Record<VariantKeys, ApplyVariantFn>,
    options: DefinitionOptions & {
        rename?: RenameFn;
    } = defaultDefinitionOptions
) {
    type ReturnKey = VariantsReturnKey<RootKey, VariantKeys>;

    const renameFn = options.rename || defaultRenameFn;

    return Object.keys(variantsMap).reduce<Record<ReturnKey, Variable>>(
        (acc, key) => {
            const variantFn = variantsMap[key as VariantKeys];
            const variableName = renameFn(`${target.__name}-${key}`);
            acc[toCamelCase(variableName) as ReturnKey] = variable(
                variableName,
                variantFn(ref(target)),
                options
            );
            return acc;
        },
        {} as Record<ReturnKey, Variable>
    );
}
