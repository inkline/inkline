import {
    Color,
    DefinitionOptions,
    HSLAColorInlineProperty,
    RenameFn,
    TokenValue,
    Variable
} from '../types';
import { hsla, ref, variable } from '../tokens';
import { normalizeTokenName, toExportedName } from '../utils';
import type { VariantsReturnKey } from './useVariantsFactory';
import { defaultDefinitionOptions, defaultRenameFn } from '../constants';
import { isColor, isRef } from '../typeGuards';

/**
 * Types
 */

export type ApplyComposedVariantFn = (current: TokenValue[]) => TokenValue[];

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
export function useComposedVariantsFactory<
    RootKeys extends string,
    VariantKeys extends string,
    Name extends string = string
>(
    composed: Variable<Name>,
    variantsMap: Record<VariantKeys, ApplyComposedVariantFn>,
    options: DefinitionOptions & {
        rename?: {
            composed?: RenameFn;
            part?: RenameFn;
        };
    } = defaultDefinitionOptions
) {
    type ReturnKey = VariantsReturnKey<RootKeys, VariantKeys>;

    const value = composed.__value;
    const valueIsColor = isColor(value);
    const parts = valueIsColor ? value.__value : value;

    if (!Array.isArray(parts)) {
        throw new Error(
            `The composed variable must be an array of references to individual variables.`
        );
    }

    const renameComposedFn = options.rename?.composed || defaultRenameFn;
    const renamePartFn = options.rename?.part || defaultRenameFn;

    return Object.keys(variantsMap).reduce<Record<ReturnKey, Variable>>(
        (acc, key) => {
            const variantFn = variantsMap[key as VariantKeys];
            const partVariables: Variable[] = [];

            const partsVariantsValues = variantFn(parts);
            parts.forEach((part, index) => {
                const partVariableName = renamePartFn(
                    normalizeTokenName(isRef(part) ? `${part.__name}-${key}` : key)
                );
                const partVariable = variable(partVariableName, partsVariantsValues[index], {
                    default: options?.default
                });
                acc[toExportedName(partVariableName) as ReturnKey] = partVariable;
                partVariables.push(partVariable);
            });

            const composedVariableName = renameComposedFn(
                normalizeTokenName(`${composed.__name}-${key}`)
            );
            const composedVariableValue = partVariables.map((partVariable) => ref(partVariable));
            const composedVariable = variable(
                composedVariableName,
                valueIsColor
                    ? hsla(composedVariableValue as HSLAColorInlineProperty)
                    : composedVariableValue,
                { default: options?.default }
            );
            acc[toExportedName(composedVariableName) as ReturnKey] = composedVariable;

            return acc;
        },
        {} as Record<ReturnKey, Variable>
    );
}
