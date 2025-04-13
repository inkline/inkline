import {
    ref,
    resolvePercentagePropertyValue,
    color,
    DefinitionOptions,
    css,
    hsla,
    defaultDefinitionOptions
} from '@inkline/core';
import type { ColorVariantKeys, Variable } from '@inkline/core';
import { ApplyVariantFn, createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

/**
 * Constants
 */

export const defaultColorLightnessValues = {
    '50': 95,
    '100': 90,
    '200': 80,
    '300': 70,
    '400': 60,
    '500': 50,
    '600': 40,
    '700': 30,
    '800': 20,
    '900': 10,
    '950': 5
};

export const defaultColorTintValues = {
    'tint-50': 5,
    'tint-100': 10,
    'tint-150': 15
};

export const defaultColorShadeValues = {
    'shade-50': 5,
    'shade-100': 10,
    'shade-150': 15
};

/**
 * Creates color lightness variants for the given color
 */
export function useColorLightnessVariantsFactory<RootKey extends string>(
    composed: Variable<RootKey>,
    options: DefinitionOptions
) {
    type VariantKeys = keyof typeof defaultColorLightnessValues;

    const keys = Object.keys(defaultColorLightnessValues) as VariantKeys[];
    const variants = keys.reduce<Record<string, ApplyVariantFn>>((acc, key) => {
        const l = resolvePercentagePropertyValue(defaultColorLightnessValues[key]);
        acc[key] = createVariantFactoryFn((current) => hsla(css`from ${current} h s ${l} / alpha`));
        return acc;
    }, {});

    return useVariantsFactory<RootKey, ColorVariantKeys<VariantKeys>>(composed, variants, options);
}

/**
 * Creates color tint variants for the given color
 */
export function useColorTintVariantsFactory<RootKey extends string>(
    composed: Variable<RootKey>,
    options: DefinitionOptions
) {
    type VariantKeys = keyof typeof defaultColorTintValues;

    const keys = Object.keys(defaultColorTintValues) as VariantKeys[];
    const variants = keys.reduce<Record<string, ApplyVariantFn>>((acc, key) => {
        const changeInLightness = defaultColorTintValues[key];
        acc[key] = createVariantFactoryFn((current) =>
            hsla(css`from ${current} h s calc(l + ${changeInLightness}) / alpha`)
        );
        return acc;
    }, {});

    return useVariantsFactory<RootKey, ColorVariantKeys<VariantKeys>>(composed, variants, options);
}

/**
 * Creates color shade variants for the given color
 */
export function useColorShadeVariantsFactory<RootKey extends string>(
    composed: Variable<RootKey>,
    options: DefinitionOptions
) {
    type VariantKeys = keyof typeof defaultColorShadeValues;

    const keys = Object.keys(defaultColorShadeValues) as VariantKeys[];
    const variants = keys.reduce<Record<string, ApplyVariantFn>>((acc, key) => {
        const changeInLightness = defaultColorShadeValues[key];
        acc[key] = createVariantFactoryFn((current) =>
            hsla(css`from ${current} h s calc(l - ${changeInLightness}) / alpha`)
        );
        return acc;
    }, {});

    return useVariantsFactory<RootKey, ColorVariantKeys<VariantKeys>>(composed, variants, options);
}

/**
 * Composables
 */

export function useBaseColors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const colorRed = color('color-red', '#f55252', options);
    const colorOrange = color('color-orange', '#f98e5a', options);
    const colorYellow = color('color-yellow', '#ffda77', options);
    const colorGreen = color('color-green', '#2fb079', options);
    const colorTeal = color('color-teal', '#48b4a9', options);
    const colorBlue = color('color-blue', '#178bb2', options);
    const colorIndigo = color('color-indigo', '#4c6ef5', options);
    const colorPurple = color('color-purple', '#8268ae', options);
    const colorPink = color('color-pink', '#fc778a', options);

    const baseColorMap = {
        red: colorRed,
        orange: colorOrange,
        yellow: colorYellow,
        green: colorGreen,
        teal: colorTeal,
        blue: colorBlue,
        indigo: colorIndigo,
        purple: colorPurple,
        pink: colorPink
    };

    return {
        colorRed,
        colorOrange,
        colorYellow,
        colorGreen,
        colorTeal,
        colorBlue,
        colorIndigo,
        colorPurple,
        colorPink,
        baseColorMap
    };
}

export function useNeutralColors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const colorWhite = color('color-white', '#ffffff', options);
    const colorBlack = color('color-black', '#000000', options);

    const colorGray = color('color-gray', '#8e9fa4', options);

    const {
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
    } = useColorLightnessVariantsFactory(colorGray, options);

    const neutralColorMap = {
        'gray-50': colorGray50,
        'gray-100': colorGray100,
        'gray-200': colorGray200,
        'gray-300': colorGray300,
        'gray-400': colorGray400,
        'gray-500': colorGray500,
        'gray-600': colorGray600,
        'gray-700': colorGray700,
        'gray-800': colorGray800,
        'gray-900': colorGray900,
        'gray-950': colorGray950,
        gray: colorGray,
        white: colorWhite,
        black: colorBlack
    };

    return {
        colorWhite,
        colorBlack,
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
        colorGray950,
        neutralColorMap
    };
}

export function useBrandBaseColors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorBlue, colorRed, colorYellow, colorGreen, colorPurple, colorTeal } =
        useBaseColors(options);

    const { colorGray800, colorGray100 } = useNeutralColors(options);

    const colorPrimary = color('color-primary', ref(colorBlue), options);
    const colorSecondary = color('color-secondary', ref(colorPurple), options);
    const colorInfo = color('color-info', ref(colorTeal), options);
    const colorSuccess = color('color-success', ref(colorGreen), options);
    const colorWarning = color('color-warning', ref(colorYellow), options);
    const colorDanger = color('color-danger', ref(colorRed), options);
    const colorLight = color('color-light', ref(colorGray100), options);
    const colorDark = color('color-dark', ref(colorGray800), options);

    const brandColorMap = {
        primary: colorPrimary,
        secondary: colorSecondary,
        info: colorInfo,
        success: colorSuccess,
        warning: colorWarning,
        danger: colorDanger,
        light: colorLight,
        dark: colorDark
    };

    return {
        colorPrimary,
        colorSecondary,
        colorInfo,
        colorSuccess,
        colorWarning,
        colorDanger,
        colorLight,
        colorDark,
        brandColorMap
    };
}

export function useBrandColorVariants(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorPrimary,
        colorSecondary,
        colorInfo,
        colorSuccess,
        colorWarning,
        colorDanger,
        colorLight,
        colorDark
    } = useBrandBaseColors(options);

    const {
        colorPrimary100,
        colorPrimary200,
        colorPrimary300,
        colorPrimary400,
        colorPrimary500,
        colorPrimary600,
        colorPrimary700,
        colorPrimary800,
        colorPrimary900
    } = useColorLightnessVariantsFactory(colorPrimary, options);

    const { colorPrimaryTint50, colorPrimaryTint100, colorPrimaryTint150 } =
        useColorTintVariantsFactory(colorPrimary, options);

    const { colorPrimaryShade50, colorPrimaryShade100, colorPrimaryShade150 } =
        useColorShadeVariantsFactory(colorPrimary, options);

    const {
        colorSecondary100,
        colorSecondary200,
        colorSecondary300,
        colorSecondary400,
        colorSecondary500,
        colorSecondary600,
        colorSecondary700,
        colorSecondary800,
        colorSecondary900
    } = useColorLightnessVariantsFactory(colorSecondary, options);

    const { colorSecondaryTint50, colorSecondaryTint100, colorSecondaryTint150 } =
        useColorTintVariantsFactory(colorSecondary, options);

    const { colorSecondaryShade50, colorSecondaryShade100, colorSecondaryShade150 } =
        useColorShadeVariantsFactory(colorSecondary, options);

    const {
        colorInfo100,
        colorInfo200,
        colorInfo300,
        colorInfo400,
        colorInfo500,
        colorInfo600,
        colorInfo700,
        colorInfo800,
        colorInfo900
    } = useColorLightnessVariantsFactory(colorInfo, options);

    const { colorInfoTint50, colorInfoTint100, colorInfoTint150 } = useColorTintVariantsFactory(
        colorInfo,
        options
    );

    const { colorInfoShade50, colorInfoShade100, colorInfoShade150 } = useColorShadeVariantsFactory(
        colorInfo,
        options
    );

    const {
        colorSuccess100,
        colorSuccess200,
        colorSuccess300,
        colorSuccess400,
        colorSuccess500,
        colorSuccess600,
        colorSuccess700,
        colorSuccess800,
        colorSuccess900
    } = useColorLightnessVariantsFactory(colorSuccess, options);

    const { colorSuccessTint50, colorSuccessTint100, colorSuccessTint150 } =
        useColorTintVariantsFactory(colorSuccess, options);

    const { colorSuccessShade50, colorSuccessShade100, colorSuccessShade150 } =
        useColorShadeVariantsFactory(colorSuccess, options);

    const {
        colorWarning100,
        colorWarning200,
        colorWarning300,
        colorWarning400,
        colorWarning500,
        colorWarning600,
        colorWarning700,
        colorWarning800,
        colorWarning900
    } = useColorLightnessVariantsFactory(colorWarning, options);

    const { colorWarningTint50, colorWarningTint100, colorWarningTint150 } =
        useColorTintVariantsFactory(colorWarning, options);

    const { colorWarningShade50, colorWarningShade100, colorWarningShade150 } =
        useColorShadeVariantsFactory(colorWarning, options);

    const {
        colorDanger100,
        colorDanger200,
        colorDanger300,
        colorDanger400,
        colorDanger500,
        colorDanger600,
        colorDanger700,
        colorDanger800,
        colorDanger900
    } = useColorLightnessVariantsFactory(colorDanger, options);

    const { colorDangerTint50, colorDangerTint100, colorDangerTint150 } =
        useColorTintVariantsFactory(colorDanger, options);

    const { colorDangerShade50, colorDangerShade100, colorDangerShade150 } =
        useColorShadeVariantsFactory(colorDanger, options);

    const { colorLightShade50, colorLightShade100, colorLightShade150 } =
        useColorShadeVariantsFactory(colorLight, options);

    const { colorLightTint50, colorLightTint100, colorLightTint150 } = useColorTintVariantsFactory(
        colorLight,
        options
    );

    const { colorDarkTint50, colorDarkTint100, colorDarkTint150 } = useColorTintVariantsFactory(
        colorDark,
        options
    );

    const { colorDarkShade50, colorDarkShade100, colorDarkShade150 } = useColorShadeVariantsFactory(
        colorDark,
        options
    );

    const brandColorVariantMap = {
        'primary-100': colorPrimary100,
        'primary-200': colorPrimary200,
        'primary-300': colorPrimary300,
        'primary-400': colorPrimary400,
        'primary-500': colorPrimary500,
        'primary-600': colorPrimary600,
        'primary-700': colorPrimary700,
        'primary-800': colorPrimary800,
        'primary-900': colorPrimary900,
        'primary-tint-50': colorPrimaryTint50,
        'primary-tint-100': colorPrimaryTint100,
        'primary-tint-150': colorPrimaryTint150,
        'primary-shade-50': colorPrimaryShade50,
        'primary-shade-100': colorPrimaryShade100,
        'primary-shade-150': colorPrimaryShade150,

        'secondary-100': colorSecondary100,
        'secondary-200': colorSecondary200,
        'secondary-300': colorSecondary300,
        'secondary-400': colorSecondary400,
        'secondary-500': colorSecondary500,
        'secondary-600': colorSecondary600,
        'secondary-700': colorSecondary700,
        'secondary-800': colorSecondary800,
        'secondary-900': colorSecondary900,
        'secondary-tint-50': colorSecondaryTint50,
        'secondary-tint-100': colorSecondaryTint100,
        'secondary-tint-150': colorSecondaryTint150,
        'secondary-shade-50': colorSecondaryShade50,
        'secondary-shade-100': colorSecondaryShade100,
        'secondary-shade-150': colorSecondaryShade150,

        'info-100': colorInfo100,
        'info-200': colorInfo200,
        'info-300': colorInfo300,
        'info-400': colorInfo400,
        'info-500': colorInfo500,
        'info-600': colorInfo600,
        'info-700': colorInfo700,
        'info-800': colorInfo800,
        'info-900': colorInfo900,
        'info-tint-50': colorInfoTint50,
        'info-tint-100': colorInfoTint100,
        'info-tint-150': colorInfoTint150,
        'info-shade-50': colorInfoShade50,
        'info-shade-100': colorInfoShade100,
        'info-shade-150': colorInfoShade150,

        'success-100': colorSuccess100,
        'success-200': colorSuccess200,
        'success-300': colorSuccess300,
        'success-400': colorSuccess400,
        'success-500': colorSuccess500,
        'success-600': colorSuccess600,
        'success-700': colorSuccess700,
        'success-800': colorSuccess800,
        'success-900': colorSuccess900,
        'success-tint-50': colorSuccessTint50,
        'success-tint-100': colorSuccessTint100,
        'success-tint-150': colorSuccessTint150,
        'success-shade-50': colorSuccessShade50,
        'success-shade-100': colorSuccessShade100,
        'success-shade-150': colorSuccessShade150,

        'warning-100': colorWarning100,
        'warning-200': colorWarning200,
        'warning-300': colorWarning300,
        'warning-400': colorWarning400,
        'warning-500': colorWarning500,
        'warning-600': colorWarning600,
        'warning-700': colorWarning700,
        'warning-800': colorWarning800,
        'warning-900': colorWarning900,
        'warning-tint-50': colorWarningTint50,
        'warning-tint-100': colorWarningTint100,
        'warning-tint-150': colorWarningTint150,
        'warning-shade-50': colorWarningShade50,
        'warning-shade-100': colorWarningShade100,
        'warning-shade-150': colorWarningShade150,

        'danger-100': colorDanger100,
        'danger-200': colorDanger200,
        'danger-300': colorDanger300,
        'danger-400': colorDanger400,
        'danger-500': colorDanger500,
        'danger-600': colorDanger600,
        'danger-700': colorDanger700,
        'danger-800': colorDanger800,
        'danger-900': colorDanger900,
        'danger-tint-50': colorDangerTint50,
        'danger-tint-100': colorDangerTint100,
        'danger-tint-150': colorDangerTint150,
        'danger-shade-50': colorDangerShade50,
        'danger-shade-100': colorDangerShade100,
        'danger-shade-150': colorDangerShade150,

        'light-tint-50': colorLightTint50,
        'light-tint-100': colorLightTint100,
        'light-tint-150': colorLightTint150,
        'light-shade-50': colorLightShade50,
        'light-shade-100': colorLightShade100,
        'light-shade-150': colorLightShade150,

        'dark-tint-50': colorDarkTint50,
        'dark-tint-100': colorDarkTint100,
        'dark-tint-150': colorDarkTint150,
        'dark-shade-50': colorDarkShade50,
        'dark-shade-100': colorDarkShade100,
        'dark-shade-150': colorDarkShade150
    };

    return {
        colorPrimary100,
        colorPrimary200,
        colorPrimary300,
        colorPrimary400,
        colorPrimary500,
        colorPrimary600,
        colorPrimary700,
        colorPrimary800,
        colorPrimary900,
        colorPrimaryTint50,
        colorPrimaryTint100,
        colorPrimaryTint150,
        colorPrimaryShade50,
        colorPrimaryShade100,
        colorPrimaryShade150,
        colorSecondary100,
        colorSecondary200,
        colorSecondary300,
        colorSecondary400,
        colorSecondary500,
        colorSecondary600,
        colorSecondary700,
        colorSecondary800,
        colorSecondary900,
        colorSecondaryTint50,
        colorSecondaryTint100,
        colorSecondaryTint150,
        colorSecondaryShade50,
        colorSecondaryShade100,
        colorSecondaryShade150,
        colorInfo100,
        colorInfo200,
        colorInfo300,
        colorInfo400,
        colorInfo500,
        colorInfo600,
        colorInfo700,
        colorInfo800,
        colorInfo900,
        colorInfoTint50,
        colorInfoTint100,
        colorInfoTint150,
        colorInfoShade50,
        colorInfoShade100,
        colorInfoShade150,
        colorSuccess100,
        colorSuccess200,
        colorSuccess300,
        colorSuccess400,
        colorSuccess500,
        colorSuccess600,
        colorSuccess700,
        colorSuccess800,
        colorSuccess900,
        colorSuccessTint50,
        colorSuccessTint100,
        colorSuccessTint150,
        colorSuccessShade50,
        colorSuccessShade100,
        colorSuccessShade150,
        colorWarning100,
        colorWarning200,
        colorWarning300,
        colorWarning400,
        colorWarning500,
        colorWarning600,
        colorWarning700,
        colorWarning800,
        colorWarning900,
        colorWarningTint50,
        colorWarningTint100,
        colorWarningTint150,
        colorWarningShade50,
        colorWarningShade100,
        colorWarningShade150,
        colorDanger100,
        colorDanger200,
        colorDanger300,
        colorDanger400,
        colorDanger500,
        colorDanger600,
        colorDanger700,
        colorDanger800,
        colorDanger900,
        colorDangerTint50,
        colorDangerTint100,
        colorDangerTint150,
        colorDangerShade50,
        colorDangerShade100,
        colorDangerShade150,
        colorLightTint50,
        colorLightTint100,
        colorLightTint150,
        colorLightShade50,
        colorLightShade100,
        colorLightShade150,
        colorDarkTint50,
        colorDarkTint100,
        colorDarkTint150,
        colorDarkShade50,
        colorDarkShade100,
        colorDarkShade150,
        brandColorVariantMap
    };
}

export function useBrandColors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return {
        ...useBrandBaseColors(options),
        ...useBrandColorVariants(options)
    };
}

export function useColorsVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const baseColors = useBaseColors(options);
    const neutralColors = useNeutralColors(options);
    const brandColors = useBrandBaseColors(options);
    const brandColorVariants = useBrandColorVariants(options);
    const colorMap = {
        ...baseColors.baseColorMap,
        ...neutralColors.neutralColorMap,
        ...brandColors.brandColorMap,
        ...brandColorVariants.brandColorVariantMap
    };

    return {
        ...baseColors,
        ...neutralColors,
        ...brandColors,
        ...brandColorVariants,
        colorMap
    };
}

export function useColors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useColorsVariables(options);
}
