import {
    ref,
    isVariable,
    DefinitionOptions,
    defaultDefinitionOptions,
    utility,
    selector,
    TokenValue,
    ComponentValue
} from '@inkline/core';
import {
    useBorderRadius,
    useBoxShadow,
    useSpacing,
    useColors,
    useFontSize,
    useFontWeight,
    useBorder,
    useTextColor
} from '../variables';
import { toCamelCase } from '@inkline/utils';
import type { ComponentVariantState } from '@inkline/types';

export type UtilityVariantsEntry = {
    name: string;
    state?: ComponentVariantState;
    variants: Record<string, TokenValue>;
    transform?: (value: TokenValue) => ComponentValue;
};

export function addUtilityVariants(
    userOptions: DefinitionOptions,
    { name, state, variants, transform }: UtilityVariantsEntry,
    prefix: string = '_'
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    Object.entries(variants).forEach(([variant, value]) => {
        let selectorSuffix = '';
        switch (state) {
            case 'active':
                selectorSuffix = `:is(:active, [data-active="true"]):not(:disabled, [data-disabled="true"])`;
                break;
            case 'focus':
                selectorSuffix = `:is(:focus, [data-focus="true"]):not(:disabled, [data-disabled="true"])`;
                break;
            case 'hover':
                selectorSuffix = `:is(:hover, [data-hover="true"]):not(:disabled, [data-disabled="true"])`;
                break;
            case 'disabled':
                selectorSuffix = `:is(:disabled, [data-disabled="true"])`;
                break;
            case 'readonly':
                selectorSuffix = `:is(:readonly, [data-readonly="true"])`;
                break;
        }

        const valueRef = isVariable(value) ? ref(value) : value;
        const propertyName = toCamelCase(name);

        utility(
            `${state ? `${state}:` : ''}${name}${variant === 'default' ? '' : `:${variant}`}`,
            selector(
                `.${prefix}${state ? `${state}\\:` : ''}${name}${
                    variant === 'default' ? '' : `\\:${variant}`
                }${selectorSuffix}`,
                transform
                    ? transform(valueRef)
                    : {
                          [propertyName]: valueRef
                      },
                options
            ),
            options
        );
    });
}

export function useUtilities(userOptions: DefinitionOptions, prefix: string = '_') {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const borderValues = {
        0: 0,
        none: 0
    };

    const { borderColorMap, borderWidthMap, borderStyleMap } = useBorder(options);
    const {
        borderRadiusMap,
        borderTopLeftRadiusMap,
        borderTopRightRadiusMap,
        borderBottomRightRadiusMap,
        borderBottomLeftRadiusMap
    } = useBorderRadius(options);
    const { boxShadowMap } = useBoxShadow(options);
    const { fontSizeMap } = useFontSize(options);
    const { fontWeightMap } = useFontWeight(options);

    const { colorMap } = useColors(options);

    const heightMap = {
        auto: 'auto',
        100: '100%',
        0: 0,
        screen: '100vh'
    };

    const opacityMap = {
        0: 0,
        25: '0.25',
        50: '0.5',
        75: '0.75',
        100: 1
    };

    const { spacingMap } = useSpacing(options);

    const squareMap = {
        sm: '32px',
        md: '44px',
        lg: '56px'
    };

    const { textColorMap } = useTextColor(options);

    const widthMap = {
        auto: 'auto',
        100: '100%',
        0: 0,
        screen: '100vw'
    };

    const utilityVariants: UtilityVariantsEntry[] = [
        { name: 'background', variants: colorMap },
        { name: 'background', state: 'hover', variants: colorMap },
        { name: 'background', state: 'focus', variants: colorMap },
        { name: 'background', state: 'active', variants: colorMap },
        {
            name: 'border-color',
            variants: {
                ...borderColorMap,
                ...colorMap
            }
        },
        {
            name: 'border-color',
            state: 'hover',
            variants: {
                ...borderColorMap,
                ...colorMap
            }
        },
        {
            name: 'border-color',
            state: 'focus',
            variants: {
                ...borderColorMap,
                ...colorMap
            }
        },
        {
            name: 'border-color',
            state: 'active',
            variants: {
                ...borderColorMap,
                ...colorMap
            }
        },
        { name: 'border-top-color', variants: colorMap },
        { name: 'border-right-color', variants: colorMap },
        { name: 'border-bottom-color', variants: colorMap },
        { name: 'border-left-color', variants: colorMap },
        { name: 'border-style', variants: borderStyleMap },
        { name: 'border-top-style', variants: borderStyleMap },
        { name: 'border-right-style', variants: borderStyleMap },
        { name: 'border-bottom-style', variants: borderStyleMap },
        { name: 'border-left-style', variants: borderStyleMap },
        { name: 'border-width', variants: borderWidthMap },
        { name: 'border-top-width', variants: borderWidthMap },
        { name: 'border-right-width', variants: borderWidthMap },
        { name: 'border-bottom-width', variants: borderWidthMap },
        { name: 'border-left-width', variants: borderWidthMap },
        { name: 'border', variants: borderValues },
        { name: 'border-top', variants: borderValues },
        { name: 'border-right', variants: borderValues },
        { name: 'border-bottom', variants: borderValues },
        { name: 'border-left', variants: borderValues },
        { name: 'border-radius', variants: borderRadiusMap },
        { name: 'border-top-left-radius', variants: borderTopLeftRadiusMap },
        { name: 'border-top-right-radius', variants: borderTopRightRadiusMap },
        { name: 'border-bottom-right-radius', variants: borderBottomRightRadiusMap },
        { name: 'border-bottom-left-radius', variants: borderBottomLeftRadiusMap },
        { name: 'box-shadow', variants: boxShadowMap },
        {
            name: 'color',
            variants: {
                ...textColorMap,
                ...colorMap
            }
        },
        {
            name: 'color',
            state: 'hover',
            variants: {
                ...textColorMap,
                ...colorMap
            }
        },
        {
            name: 'color',
            state: 'focus',
            variants: {
                ...textColorMap,
                ...colorMap
            }
        },
        {
            name: 'color',
            state: 'active',
            variants: {
                ...textColorMap,
                ...colorMap
            }
        },
        { name: 'flex-basis', variants: widthMap },
        { name: 'font-size', variants: fontSizeMap },
        { name: 'font-weight', variants: fontWeightMap },
        { name: 'gap', variants: spacingMap },
        { name: 'gap-x', variants: spacingMap, transform: (value) => ({ rowGap: value }) },
        { name: 'gap-y', variants: spacingMap, transform: (value) => ({ columnGap: value }) },
        { name: 'height', variants: heightMap },
        { name: 'margin', variants: spacingMap },
        { name: 'margin-top', variants: spacingMap },
        { name: 'margin-right', variants: spacingMap },
        { name: 'margin-bottom', variants: spacingMap },
        { name: 'margin-left', variants: spacingMap },
        {
            name: 'margin-x',
            variants: spacingMap,
            transform: (value) => ({ paddingLeft: value, paddingRight: value })
        },
        {
            name: 'margin-y',
            variants: spacingMap,
            transform: (value) => ({ paddingLeft: value, paddingRight: value })
        },
        { name: 'opacity', variants: opacityMap },
        { name: 'padding', variants: spacingMap },
        { name: 'padding-top', variants: spacingMap },
        { name: 'padding-right', variants: spacingMap },
        { name: 'padding-bottom', variants: spacingMap },
        { name: 'padding-left', variants: spacingMap },
        {
            name: 'padding-x',
            variants: spacingMap,
            transform: (value) => ({ paddingLeft: value, paddingRight: value })
        },
        {
            name: 'padding-y',
            variants: spacingMap,
            transform: (value) => ({ paddingTop: value, paddingBottom: value })
        },
        {
            name: 'square',
            variants: squareMap,
            transform: (value) => ({ width: value, height: value })
        },
        {
            name: 'width',
            variants: widthMap
        }
    ];

    utilityVariants.forEach((entry) => {
        addUtilityVariants(options, entry, prefix);
    });
}
