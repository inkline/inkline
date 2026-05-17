import { DefinitionOptions, ExportedName, RenameFn, TokenValue, Variable } from '@inkline/core';
import { ref, variable, defaultRenameFn } from '@inkline/core';
import { toCamelCase } from '@inkline/utils';

/**
 * Types
 */

export type VariantsReturnKey<
    RootKeys extends string,
    VariantKeys extends string
> = ExportedName<`${RootKeys}--${VariantKeys}`>;

export type ApplyVariantFn = (current: TokenValue) => TokenValue;

/**
 * Type definition functions
 */

export function createVariantFactoryFn(fn: ApplyVariantFn) {
    return fn;
}

/**
 * Creates derived variables for each variant based on the target variable
 *
 * @usage
 * ```ts
 * const scale = variable('scale', 1.2, options);
 * const variants = {
 *   'pow-minus-2': createVariantFactoryFn((value) => divide(value, value, value)),
 *   'pow-minus-1': createVariantFactoryFn((value) => divide(value, value)),
 *   'pow-1': createVariantFactoryFn((value) => multiply(value, 1)),
 *   'pow-2': createVariantFactoryFn((value) => multiply(value, value)),
 *   'pow-3': createVariantFactoryFn((value) => multiply(value, value, value)),
 * };
 * const { scaleMinus2, scaleMinus1, scalePow1, scalePow2, scalePow3 } = useVariantsFactory<'scale', keyof typeof variants>(scale, variants, options);
 * ```
 */
export function useVariantsFactory<RootKey extends string, VariantKeys extends string>(
    target: Variable | Variable['__name'],
    variantsMap: Record<VariantKeys, ApplyVariantFn>,
    options: DefinitionOptions & {
        separator?: string;
        rename?: RenameFn;
    }
) {
    type ReturnKey = VariantsReturnKey<RootKey, VariantKeys>;

    const renameFn = options.rename || defaultRenameFn;
    const separator = options.separator || '--';

    return Object.keys(variantsMap).reduce<Record<ReturnKey, Variable>>(
        (acc, key) => {
            const variantFn = variantsMap[key as VariantKeys];
            const variableName = renameFn(
                `${typeof target === 'string' ? target : target.__name}${separator}${key}`
            );
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
