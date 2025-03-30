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

    return {
        colorRed,
        colorOrange,
        colorYellow,
        colorGreen,
        colorTeal,
        colorBlue,
        colorIndigo,
        colorPurple,
        colorPink
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
        colorGray950
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

    return {
        colorPrimary,
        colorSecondary,
        colorInfo,
        colorSuccess,
        colorWarning,
        colorDanger,
        colorLight,
        colorDark
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
        colorDarkShade150
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

    return {
        ...useBaseColors(options),
        ...useNeutralColors(options),
        ...useBrandColors(options),
        ...useBrandColorVariants(options)
    };
}

export function useColors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useColorsVariables(options);
}
