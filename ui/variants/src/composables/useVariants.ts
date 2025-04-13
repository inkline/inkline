import { computed, unref, MaybeRef } from 'vue';
import {
    useOptions,
    getComponentOptionsColorModeValue,
    getComponentOptionsValue
} from '@inkline/composables';
import type { ComponentProps, ComponentVariantState } from '@inkline/types';
import {
    toVariantList,
    fold,
    toStatefulName,
    resolveVariantByName,
    resolveVariant
} from '../utils';
import { toKebabCase, isArray } from '@inkline/utils';
import { variantStateKeys } from '../constants';
import { ComponentVariantProps } from '@inkline/types';
import { VariantType } from '../types';

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
    variantByState: MaybeRef<Record<string, VariantType>>
) {
    const { options } = useOptions();

    const utilityPrefix = computed(() => options.value.theme?.prefix ?? '');
    const variants = computed(() => options.value.theme?.variants ?? {});

    const variantOverrides = computed(() => {
        const variantByStateValue = unref(variantByState);

        return Object.entries(variantByStateValue).reduce<Record<string, ComponentVariantProps>>(
            (acc, [state, variant]) => {
                acc[state] = variant;

                return acc;
            },
            {}
        );
    });

    // const variantList = computed(() => {
    //     const list = unref(variantNameOrProps);
    //     if (typeof list === 'string' || isArray(list)) {
    //         return toVariantList(list);
    //     }
    //
    //     return [];
    // });

    /**
     * Resolve variants based on props for each state
     */
    const variantStates = computed(
        () => ({})
        // variantStateKeys.reduce<Record<ComponentVariantState, ComponentProps>>(
        //     (acc, state) => {
        //         acc[state] = fold(
        //             variantList.value.reduce<ComponentProps>((acc, variantName) => {
        //                 const variantNameWithState = toStatefulName(variantName, state);
        //                 const value = resolveVariantByName(variants.value, variantNameWithState);
        //
        //                 return { ...acc, ...value };
        //             }, {})
        //         );
        //
        //         return acc;
        //     },
        //     {} as Record<ComponentVariantState, ComponentProps>
        // )
    );

    /**
     * Resolve props based on variants
     * Each property can also be set through the global theme settings
     */
    const resolvedProps = computed(
        () => ({})
        // Object.keys(variantProps.value).reduce<Record<string, string>>((acc, key) => {
        //     const propertyName = key as keyof ComponentProps;
        //     variantStateKeys.forEach((state) => {
        //         const propertyNameWithState = toStatefulName(propertyName, state);
        //         const propertyValueFromState = variantStates.value[state][propertyName];
        //         const propertyValue =
        //             state === 'default'
        //                 ? ((variantProps.value[key] as string) ?? propertyValueFromState)
        //                 : propertyValueFromState;
        //
        //         const resolvedValue = isColorProp[propertyName as keyof typeof isColorProp]
        //             ? getComponentOptionsColorModeValue(
        //                   options,
        //                   componentName,
        //                   propertyName,
        //                   propertyValue
        //               )
        //             : getComponentOptionsValue(options, componentName, propertyName, propertyValue);
        //
        //         if (resolvedValue) {
        //             acc[propertyNameWithState] = resolvedValue as string;
        //         }
        //     });
        //
        //     return acc;
        // }, {})
    );

    /**
     * Generate classes based on resolved props
     */
    const classes = computed(() => {
        return [];
        // return Object.entries(resolvedProps.value).reduce<Record<string, boolean>>(
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
        // );
    });

    return { classes };
}
