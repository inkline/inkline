import { computed } from 'vue';
import {
    useOptions,
    getComponentOptionsColorModeValue,
    getComponentOptionsValue
} from '@inkline/composables';
import { toCamelCase, toKebabCase } from '@inkline/utils';
import { resolveVariant } from '../utilities';
import type { ComponentProps } from '@inkline/types';
import { toVariantList } from '@inkline/utils';

const propsConfig: Array<{
    key: keyof ComponentProps;
    color?: boolean;
}> = [
    { key: 'background', color: true },
    { key: 'borderColor', color: true },
    { key: 'borderTopColor', color: true },
    { key: 'borderRightColor', color: true },
    { key: 'borderBottomColor', color: true },
    { key: 'borderLeftColor', color: true },
    { key: 'color', color: true },
    { key: 'border' },
    { key: 'borderStyle' },
    { key: 'borderTopStyle' },
    { key: 'borderRightStyle' },
    { key: 'borderBottomStyle' },
    { key: 'borderLeftStyle' },
    { key: 'borderWidth' },
    { key: 'borderTopWidth' },
    { key: 'borderRightWidth' },
    { key: 'borderBottomWidth' },
    { key: 'borderLeftWidth' },
    { key: 'borderRadius' },
    { key: 'borderTopLeftRadius' },
    { key: 'borderTopRightRadius' },
    { key: 'borderBottomLeftRadius' },
    { key: 'borderBottomRightRadius' },
    { key: 'boxShadow' },
    { key: 'fontSize' },
    { key: 'fontWeight' },
    { key: 'margin' },
    { key: 'marginTop' },
    { key: 'marginRight' },
    { key: 'marginBottom' },
    { key: 'marginLeft' },
    { key: 'marginX' },
    { key: 'marginY' },
    { key: 'maxWidth' },
    { key: 'maxHeight' },
    { key: 'minWidth' },
    { key: 'minHeight' },
    { key: 'width' },
    { key: 'height' },
    { key: 'overflow' },
    { key: 'overflowX' },
    { key: 'overflowY' },
    { key: 'textAlign' },
    { key: 'textOverflow' },
    { key: 'whiteSpace' },
    { key: 'wordBreak' },
    { key: 'display' },
    { key: 'flexDirection' },
    { key: 'flexWrap' },
    { key: 'justifyContent' },
    { key: 'alignItems' },
    { key: 'alignContent' },
    { key: 'alignSelf' },
    { key: 'gap' },
    { key: 'gapX' },
    { key: 'gapY' },
    { key: 'gridTemplateColumns' },
    { key: 'gridTemplateRows' },
    { key: 'gridColumnGap' },
    { key: 'gridRowGap' },
    { key: 'gridColumnStart' },
    { key: 'gridColumnEnd' },
    { key: 'gridRowStart' },
    { key: 'gridRowEnd' },
    { key: 'padding' },
    { key: 'paddingTop' },
    { key: 'paddingRight' },
    { key: 'paddingBottom' },
    { key: 'paddingLeft' },
    { key: 'paddingX' },
    { key: 'paddingY' }
];

export function useBox<
    Props extends {
        variant: string | string[];
        [key: string]: any;
    }
>(componentName: string, props: Props) {
    type PropKey = keyof Props;

    const { options } = useOptions();

    const utilityPrefix = computed(() => options.value.theme?.prefix ?? '');
    const variants = computed(() => options.value.theme?.variants ?? {});
    const variantStateKeys = [
        'default',
        'active',
        'hover',
        'focus',
        'visited',
        'disabled',
        'readonly'
    ] as const;

    type VariantStateKey = (typeof variantStateKeys)[number];

    const variant = computed(() =>
        variantStateKeys.reduce<Record<VariantStateKey, ComponentProps>>(
            (acc, state) => {
                const variantList = toVariantList(props.variant);
                const suffix = state === 'default' ? '' : `:${state}`;

                acc[state] = variantList.reduce<ComponentProps>((acc, key) => {
                    const value = resolveVariant(variants.value, toCamelCase(`${key}${suffix}`));

                    return { ...acc, ...value };
                }, {});

                return acc;
            },
            {} as Record<VariantStateKey, ComponentProps>
        )
    );

    const kebabCasePropNamesByKey: Record<string, string> = {};
    propsConfig.forEach(({ key }) => {
        kebabCasePropNamesByKey[key] = toKebabCase(key);
        variantStateKeys.forEach((state) => {
            if (state !== 'default') {
                kebabCasePropNamesByKey[`${state}:${key}`] = toKebabCase(`${state}:${key}`);
            }
        });
    });

    const resolvedProps = computed(() =>
        propsConfig.reduce<Record<string, string>>((acc, { key: propertyName, color }) => {
            variantStateKeys.forEach((state) => {
                const propertyKey = state === 'default' ? propertyName : `${state}:${propertyName}`;

                const propertyValue =
                    state === 'default'
                        ? ((props[propertyName as PropKey] as string) ??
                          variant.value[state][propertyName])
                        : variant.value[state][propertyName];

                const resolvedValue = color
                    ? getComponentOptionsColorModeValue(
                          options,
                          componentName,
                          propertyName,
                          propertyValue
                      )
                    : getComponentOptionsValue(options, componentName, propertyName, propertyValue);

                if (resolvedValue) {
                    acc[propertyKey] = resolvedValue as string;
                }
            });

            return acc;
        }, {})
    );

    const classes = computed(() => {
        const prefix = utilityPrefix.value;
        const result = Object.entries(resolvedProps.value).reduce<Record<string, boolean>>(
            (acc, [key, value]) => {
                if (value) {
                    acc[`${prefix}${kebabCasePropNamesByKey[key]}:${value}`] = true;
                }

                return acc;
            },
            {}
        );

        result['box'] = true;

        return result;
    });

    return { classes };
}
