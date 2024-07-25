import { DefinitionOptions, Reference, RenameFn, TokenValue, Variable } from '../types';
import { ref, variable } from '../tokens';
import { toCamelCase } from '../utils';
import type { VariantsReturnKey } from './useVariantsFactory';
import { defaultDefinitionOptions, defaultRenameFn } from '../constants';

/**
 * Types
 */

export type ApplyComposedVariantFn = (current: Reference[]) => TokenValue[];

/**
 * Type definition functions
 */

export function createComposedVariantFactoryFn(fn: ApplyComposedVariantFn) {
    return fn;
}

/**
 * Creates derived individual and composed variables for each variant based on the composed variable.
 * The composed variable is an array of references to individual variables.
 * The resulting derived variables will be an array of references to the derived individual variables.
 */
export function useComposedVariantsFactory<RootKeys extends string, VariantKeys extends string>(
    composed: Variable<Reference[]>,
    variantsMap: Record<VariantKeys, ApplyComposedVariantFn>,
    options: DefinitionOptions & {
        rename?: {
            composed?: RenameFn;
            part?: RenameFn;
        };
    } = defaultDefinitionOptions
) {
    type ReturnKey = VariantsReturnKey<RootKeys, VariantKeys>;

    const parts = composed.__value;

    const renameComposedFn = options.rename?.composed || defaultRenameFn;
    const renamePartFn = options.rename?.part || defaultRenameFn;

    return Object.keys(variantsMap).reduce<Record<ReturnKey, Variable>>(
        (acc, key) => {
            const variantFn = variantsMap[key as VariantKeys];
            const partVariables: Variable[] = [];

            const partsVariantsValues = variantFn(parts);
            parts.forEach((part, index) => {
                const partVariableName = renamePartFn(`${part.__name}-${key}`);
                const partVariable = variable(partVariableName, partsVariantsValues[index], {
                    default: options?.default
                });
                acc[toCamelCase(partVariableName) as ReturnKey] = partVariable;
                partVariables.push(partVariable);
            });

            const composedVariableName = renameComposedFn(`${composed.__name}-${key}`);
            const composedVariable = variable(
                composedVariableName,
                partVariables.map((partVariable) => ref(partVariable)),
                { default: options?.default }
            );
            acc[toCamelCase(composedVariableName) as ReturnKey] = composedVariable;

            return acc;
        },
        {} as Record<ReturnKey, Variable>
    );
}
