import { computed } from 'vue';
import {
    useOptions,
    getComponentOptionsColorModeValue,
    getComponentOptionsValue
} from '@inkline/composables';
import type { ComponentProps, ComponentVariantState } from '@inkline/types';
import { toVariantList, fold, toStatefulName, resolveVariant } from '../utils';
import { toKebabCase } from '@inkline/utils';
import { variantStateKeys } from '../constants';

const isColorProp = {
    background: true,
    borderColor: true,
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
    color: true
} as const;

export function useVariants<VariantProps extends ComponentProps>(
    componentName: string,
    props: VariantProps,
    {
        exclude = []
    }: {
        exclude?: Array<keyof VariantProps>;
    } = {}
) {
    const { options } = useOptions();

    const utilityPrefix = computed(() => options.value.theme?.prefix ?? '');
    const variants = computed(() => options.value.theme?.variants ?? {});
    const variant = computed(() => props.variant);

    /**
     * Set props to be resolved
     */
    const propsList = Object.keys(props).filter(
        (key) => !exclude.includes(key) && key !== 'variant'
    );

    /**
     * Cache for kebab case property names
     */
    const kebabCasePropNamesCache: Record<string, string> = {};
    propsList.forEach((propertyName) => {
        variantStateKeys.forEach((state) => {
            const propertyNameWithState = toStatefulName(propertyName, state);
            kebabCasePropNamesCache[propertyNameWithState] = toKebabCase(propertyNameWithState);
        });
    });

    /**
     * Resolve variants based on props for each state
     */
    const variantStates = computed(() =>
        variantStateKeys.reduce<Record<ComponentVariantState, ComponentProps>>(
            (acc, state) => {
                const variantList = toVariantList(variant.value);

                acc[state] = fold(
                    variantList.reduce<ComponentProps>((acc, variantName) => {
                        const variantNameWithState = toStatefulName(variantName, state);
                        const value = resolveVariant(variants.value, variantNameWithState);

                        return { ...acc, ...value };
                    }, {})
                );

                return acc;
            },
            {} as Record<ComponentVariantState, ComponentProps>
        )
    );

    /**
     * Resolve props based on variants
     * Each property can also be set through the global theme settings
     */
    const resolvedProps = computed(() =>
        propsList.reduce<Record<string, string>>((acc, key) => {
            const propertyName = key as keyof ComponentProps;
            variantStateKeys.forEach((state) => {
                const propertyNameWithState = toStatefulName(propertyName, state);
                const propertyValueFromState = variantStates.value[state][propertyName];
                const propertyValue =
                    state === 'default'
                        ? ((props[key] as string) ?? propertyValueFromState)
                        : propertyValueFromState;

                const resolvedValue = isColorProp[propertyName as keyof typeof isColorProp]
                    ? getComponentOptionsColorModeValue(
                          options,
                          componentName,
                          propertyName,
                          propertyValue
                      )
                    : getComponentOptionsValue(options, componentName, propertyName, propertyValue);

                if (resolvedValue) {
                    acc[propertyNameWithState] = resolvedValue as string;
                }
            });

            return acc;
        }, {})
    );

    /**
     * Generate classes based on resolved props
     */
    const classes = computed(() => {
        return Object.entries(resolvedProps.value).reduce<Record<string, boolean>>(
            (acc, [key, variant]) => {
                if (variant) {
                    const variantString = variant === 'default' ? '' : `:${variant}`;
                    acc[`${utilityPrefix.value}${kebabCasePropNamesCache[key]}${variantString}`] =
                        true;
                }

                return acc;
            },
            {}
        );
    });

    return { classes };
}
