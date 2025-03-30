import {
    ref,
    isVariable,
    DefinitionOptions,
    defaultDefinitionOptions,
    utility,
    selector,
    TokenValue
} from '@inkline/core';
import {
    useBorderRadius,
    useBoxShadow,
    useSpacing,
    useColors,
    useFontSize,
    useFontWeight
} from '../variables';
import { toCamelCase } from '@inkline/utils';

export function useUtilities(userOptions: DefinitionOptions, prefix: string = '_') {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacingMap } = useSpacing(options);

    const {
        colorLight,
        colorLightShade50,
        colorLightShade100,
        colorDark,
        colorDarkTint50,
        colorDarkTint100,
        colorWhite,
        colorBlack,
        colorPrimary,
        colorPrimaryShade50,
        colorPrimaryShade100,
        colorPrimary800,
        colorPrimary100,
        colorSecondary,
        colorSecondaryShade50,
        colorSecondaryShade100,
        colorSecondary800,
        colorSecondary100,
        colorSuccess,
        colorSuccessShade50,
        colorSuccessShade100,
        colorSuccess800,
        colorSuccess100,
        colorDanger,
        colorDangerShade50,
        colorDangerShade100,
        colorDanger800,
        colorDanger100,
        colorWarning,
        colorWarningShade50,
        colorWarningShade100,
        colorWarning800,
        colorWarning100,
        colorInfo,
        colorInfoShade50,
        colorInfoShade100,
        colorInfo800,
        colorInfo100,
        colorGray,
        colorGray50,
        colorGray100,
        colorGray200,
        colorGray300,
        colorGray400,
        colorGray500,
        colorGray600,
        colorGray700,
        colorGray800,
        colorGray900,
        colorGray950
    } = useColors(options);

    const colorValues = {
        white: ref(colorWhite),
        gray: ref(colorGray),
        black: ref(colorBlack),
        light: ref(colorLight),
        dark: ref(colorDark),
        primary: ref(colorPrimary),
        secondary: ref(colorSecondary),
        success: ref(colorSuccess),
        danger: ref(colorDanger),
        warning: ref(colorWarning),
        info: ref(colorInfo)
    };

    const colorShadeValues = {
        'light-shade-50': ref(colorLightShade50),
        'light-shade-100': ref(colorLightShade100),
        'dark-tint-50': ref(colorDarkTint50),
        'dark-tint-100': ref(colorDarkTint100),
        'primary-shade-50': ref(colorPrimaryShade50),
        'primary-shade-100': ref(colorPrimaryShade100),
        'secondary-shade-50': ref(colorSecondaryShade50),
        'secondary-shade-100': ref(colorSecondaryShade100),
        'success-shade-50': ref(colorSuccessShade50),
        'success-shade-100': ref(colorSuccessShade100),
        'danger-shade-50': ref(colorDangerShade50),
        'danger-shade-100': ref(colorDangerShade100),
        'warning-shade-50': ref(colorWarningShade50),
        'warning-shade-100': ref(colorWarningShade100),
        'info-shade-50': ref(colorInfoShade50),
        'info-shade-100': ref(colorInfoShade100)
    };

    const colorLevelValues = {
        'primary-100': ref(colorPrimary100),
        'primary-800': ref(colorPrimary800),
        'secondary-100': ref(colorSecondary100),
        'secondary-800': ref(colorSecondary800),
        'success-100': ref(colorSuccess100),
        'success-800': ref(colorSuccess800),
        'danger-100': ref(colorDanger100),
        'danger-800': ref(colorDanger800),
        'warning-100': ref(colorWarning100),
        'warning-800': ref(colorWarning800),
        'info-100': ref(colorInfo100),
        'info-800': ref(colorInfo800),
        'gray-50': ref(colorGray50),
        'gray-100': ref(colorGray100),
        'gray-200': ref(colorGray200),
        'gray-300': ref(colorGray300),
        'gray-400': ref(colorGray400),
        'gray-500': ref(colorGray500),
        'gray-600': ref(colorGray600),
        'gray-700': ref(colorGray700),
        'gray-800': ref(colorGray800),
        'gray-900': ref(colorGray900),
        'gray-950': ref(colorGray950)
    };

    const borderStyleValues = {
        none: 'none',
        solid: 'solid',
        dashed: 'dashed',
        dotted: 'dotted',
        double: 'double',
        groove: 'groove'
    };

    const borderWidthValues = {
        0: 0,
        none: 0,
        thin: 'thin',
        medium: 'medium',
        thick: 'thick'
    };

    const borderValues = {
        0: 0,
        none: 0
    };

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

    const utilities: Array<{
        name: string;
        state?: 'active' | 'focus' | 'hover' | 'disabled' | 'readonly';
        variants: Record<string, TokenValue>;
        transform?: (value: TokenValue) => Record<string, TokenValue>;
    }> = [
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
            transform: (value) => ({ paddingLeft: value, paddingRight: value })
        },
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
        { name: 'gap', variants: spacingMap },
        { name: 'gap-x', variants: spacingMap, transform: (value) => ({ rowGap: value }) },
        { name: 'gap-y', variants: spacingMap, transform: (value) => ({ columnGap: value }) },
        {
            name: 'background',
            variants: { ...colorValues, ...colorShadeValues, ...colorLevelValues }
        },
        {
            name: 'hover:background',
            variants: { ...colorValues, ...colorShadeValues, ...colorLevelValues }
        },
        {
            name: 'focus:background',
            variants: { ...colorValues, ...colorShadeValues, ...colorLevelValues }
        },
        {
            name: 'active:background',
            variants: { ...colorValues, ...colorShadeValues, ...colorLevelValues }
        },
        { name: 'color', variants: { ...colorValues, ...colorShadeValues, ...colorLevelValues } },
        { name: 'color', state: 'hover', variants: { ...colorValues, ...colorShadeValues } },
        { name: 'color', state: 'focus', variants: { ...colorValues, ...colorShadeValues } },
        { name: 'color', state: 'active', variants: { ...colorValues, ...colorShadeValues } },
        { name: 'border-color', variants: { ...colorValues, ...colorShadeValues } },
        {
            name: 'border-color',
            state: 'hover',
            variants: { ...colorValues, ...colorShadeValues, ...colorLevelValues }
        },
        {
            name: 'border-color',
            state: 'focus',
            variants: { ...colorValues, ...colorShadeValues, ...colorLevelValues }
        },
        {
            name: 'border-color',
            state: 'active',
            variants: { ...colorValues, ...colorShadeValues, ...colorLevelValues }
        },
        { name: 'border-top-color', variants: { ...colorValues, ...colorShadeValues } },
        { name: 'border-right-color', variants: { ...colorValues, ...colorShadeValues } },
        { name: 'border-bottom-color', variants: { ...colorValues, ...colorShadeValues } },
        { name: 'border-left-color', variants: { ...colorValues, ...colorShadeValues } },
        { name: 'border-style', variants: borderStyleValues },
        { name: 'border-top-style', variants: borderStyleValues },
        { name: 'border-right-style', variants: borderStyleValues },
        { name: 'border-bottom-style', variants: borderStyleValues },
        { name: 'border-left-style', variants: borderStyleValues },
        { name: 'border-width', variants: borderWidthValues },
        { name: 'border-top-width', variants: borderWidthValues },
        { name: 'border-right-width', variants: borderWidthValues },
        { name: 'border-bottom-width', variants: borderWidthValues },
        { name: 'border-left-width', variants: borderWidthValues },
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
        { name: 'font-size', variants: fontSizeMap },
        { name: 'font-weight', variants: fontWeightMap }
    ];

    utilities.forEach(({ name, state, variants, transform }) => {
        Object.entries(variants).forEach(([variant, value]) => {
            const selectorPrefix = state ? `${state}\\:` : '';
            let selectorSuffix = '';
            switch (state) {
                case 'active':
                    selectorSuffix = `:is(:active, [data-active]):not(:disabled, [data-disabled])`;
                    break;
                case 'focus':
                    selectorSuffix = `:is(:focus, [data-focus]):not(:disabled, [data-disabled])`;
                    break;
                case 'hover':
                    selectorSuffix = `:is(:hover, [data-hover]):not(:disabled, [data-disabled])`;
                    break;
                case 'disabled':
                    selectorSuffix = `:is(:disabled, [data-disabled])`;
                    break;
                case 'readonly':
                    selectorSuffix = `:is(:readonly, [data-readonly])`;
                    break;
            }

            const valueRef = isVariable(value) ? ref(value) : value;

            utility(
                `${state}:${name}${variant}`,
                selector(
                    `.${prefix}${selectorPrefix}${name}\\:${variant}${selectorSuffix}`,
                    transform
                        ? transform(valueRef)
                        : {
                              [toCamelCase(name)]: valueRef
                          },
                    options
                ),
                options
            );
        });
    });
}
