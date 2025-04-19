import { computed, toValue, MaybeRefOrGetter } from 'vue';
import {
    useOptions,
    getComponentOptionsColorModeValue,
    getComponentOptionsValue
} from '@inkline/composables';
import type {
    ComponentProps,
    VariantProps,
    VariantState,
    ValueByVariantState
} from '@inkline/types';
import { toVariantList, fold, toStatefulName, resolveVariantByName } from '../utils';
import { isArray } from '@inkline/utils';
import { VariantNameOrProps } from '../types';

const isColorProp = {
    background: true,
    borderColor: true,
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
    color: true
} as const;

/**
 * Resolve variant classes based on component name and variant props
 *
 * The `default` value `string` and `string[]` variants are expanded to cover all states
 * i.e. `default: 'primary'` expands to `default: 'primary hover:primary active:primary'`
 *
 * @TODO Decide on behaviour for `default` value
 */

export function useVariants(
    componentName: string,
    variantNameOrPropsByState: MaybeRefOrGetter<ValueByVariantState<VariantNameOrProps>>
) {
    const { options } = useOptions();

    const utilityPrefix = computed(() => options.value.theme?.prefix ?? '');
    const themeVariants = computed(() => options.value.theme?.variants ?? {});

    const stateKeys = computed(
        () => Object.keys(toValue(variantNameOrPropsByState)) as VariantState[]
    );

    /**
     * Resolve variants props based on each state
     */
    const variantPropsByState = computed(() => {
        const variantNameOrPropsByStateValue = toValue(variantNameOrPropsByState);

        return stateKeys.value.reduce<ValueByVariantState<VariantProps>>((acc, state) => {
            const variant = variantNameOrPropsByStateValue[state];

            if (typeof variant === 'string' || isArray(variant)) {
                const variantList = toVariantList(variant);

                acc[state] = fold(
                    variantList.reduce<ComponentProps>((acc, variantName) => {
                        const variantNameWithState = toStatefulName(variantName, state);
                        const value = resolveVariantByName(
                            themeVariants.value,
                            variantNameWithState
                        );

                        return { ...acc, ...value };
                    }, {})
                );
            } else {
                acc[state] = variant;
            }

            return acc;
        }, {});
    });

    /**
     * Resolve props based on variants
     * Each property can also be set through the global theme settings
     */
    const resolvedProps = computed(() =>
        stateKeys.value.reduce<Record<string, string>>((acc, state) => {
            const stateProps = variantPropsByState.value[state];
            if (!stateProps) {
                return acc;
            }

            Object.entries(stateProps).forEach(([propertyName, propertyValueFromState]) => {
                const propertyNameWithState = toStatefulName(propertyName, state);

                const resolvedValue = isColorProp[propertyName as keyof typeof isColorProp]
                    ? getComponentOptionsColorModeValue(
                          options,
                          componentName,
                          propertyName,
                          propertyValueFromState
                      )
                    : getComponentOptionsValue(
                          options,
                          componentName,
                          propertyName,
                          propertyValueFromState
                      );

                if (resolvedValue) {
                    acc[propertyNameWithState] = resolvedValue as string;
                }
            });

            return acc;
        }, {})
    );

    console.log(resolvedProps.value);

    /**
     * Generate classes based on resolved props
     */
    const classes = computed(
        () => ({})
        // Object.entries(resolvedProps.value).reduce<Record<string, boolean>>(
        //     (acc, [key, variant]) => {
        //         if (variant) {
        //             const variantString = variant === 'default' ? '' : `:${variant}`;
        //             acc[`${utilityPrefix.value}${kebabCasePropNamesCache[key]}${variantString}`] =
        //                 true;
        //         }
        //
        //         return acc;
        //     },
        //     {}
        // )
    );

    return { classes };
}
