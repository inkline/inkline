import { add, hsla, ref, subtract, variable } from '../tokens';
import parseColor from 'color';
import {
    HSLAColorProperty,
    HSLAColorInlineProperty,
    Variable,
    Color,
    ExportedName,
    NamespaceType
} from '../types';
import { createNamespacedTokenName, normalizePercentageValue, toExportedName } from '../utils';
import type { CamelCase } from 'type-fest';
import { defaultDefinitionOptions } from '../constants';
import {
    ApplyComposedVariantFn,
    createComposedVariantFactoryFn,
    useComposedVariantsFactory
} from './useComposedVariantsFactory';

/**
 * Token
 */

export type ColorComposedReturnKey<RootKey extends string> = ExportedName<RootKey>;

export type ColorPartsReturnKeys<RootKey extends string> =
    `${ColorComposedReturnKey<RootKey>}${'H' | 'S' | 'L' | 'A'}`;

export type ColorVariantKeys<VariantKeys extends string> =
    | CamelCase<VariantKeys>
    | ColorPartsReturnKeys<VariantKeys>;

/**
 * Creates a `color` token.
 * This is a special token that allows you to define a color with the given name and value.
 * The value can be a string or HSLA color object.
 * It sets and returns the composed color, as well as h, s, l, a parts.
 */
export function color<Name extends string>(
    name: Name,
    value: string | HSLAColorInlineProperty,
    options = defaultDefinitionOptions
) {
    type ComposedReturnKey = ColorComposedReturnKey<Name>;
    type PartsReturnKey = ColorPartsReturnKeys<Name>;
    type PartsReturnType = {
        [key in PartsReturnKey]: Variable;
    };
    type ComposedReturnType = {
        [key in ComposedReturnKey]: Variable<Name>;
    };
    type ReturnType = PartsReturnType & ComposedReturnType;

    const colorVariables: ReturnType = {} as ReturnType;

    let parsedColor: HSLAColorProperty;
    if (typeof value === 'string') {
        const { h, s, l, alpha: a } = parseColor(value).hsl().object();
        parsedColor = {
            h,
            s: normalizePercentageValue(s),
            l: normalizePercentageValue(l),
            a: a ?? 1
        };
    } else {
        parsedColor = {
            h: value[0],
            s: normalizePercentageValue(value[1]),
            l: normalizePercentageValue(value[2]),
            a: value[3]
        };
    }

    const composedParts: Variable[] = [];
    Object.keys(parsedColor).forEach((key) => {
        const variableName = `${name}-${key}`;
        const colorVariable = variable(variableName, parsedColor[key as keyof typeof parsedColor], {
            default: options?.default
        });

        (colorVariables as PartsReturnType)[toExportedName(variableName) as PartsReturnKey] =
            colorVariable;
        composedParts.push(colorVariable);
    });

    (colorVariables as ComposedReturnType)[toExportedName(name)] = variable(
        name,
        hsla(composedParts.map((part) => ref(part)) as HSLAColorInlineProperty)
    );

    return colorVariables;
}

/**
 * Creates a namespaced `color` token.
 * This is a special token that allows you to define a color with the given namespace, name and value.
 * The value can be a string or HSLA color object.
 */
export function nscolor<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    name: Name,
    value: string | HSLAColorInlineProperty,
    options = defaultDefinitionOptions
) {
    return color(createNamespacedTokenName(ns, name), value, options);
}

/**
 * Constants
 */

export const defaultColorLightnessValues = {
    '50': '95%',
    '100': '90%',
    '200': '80%',
    '300': '70%',
    '400': '60%',
    '500': '50%',
    '600': '40%',
    '700': '30%',
    '800': '20%',
    '900': '10%',
    '950': '5%'
};

export const defaultColorTintValues = {
    'tint-50': '5%',
    'tint-100': '10%',
    'tint-150': '15%'
};

export const defaultColorShadeValues = {
    'shade-50': '5%',
    'shade-100': '10%',
    'shade-150': '15%'
};

/**
 * Factories
 */

const defaultColorFactoryOptions = {
    rename: {
        part: (name: string) => name.replace(/(-[hsla])((-\w+)+)/, '$2$1')
    }
};

/**
 * Creates color lightness variants for the given color
 */
export function useColorLightnessVariantsFactory<RootKey extends string>(
    composed: Variable<RootKey>,
    options = defaultDefinitionOptions
) {
    type VariantKeys = keyof typeof defaultColorLightnessValues;

    const keys = Object.keys(defaultColorLightnessValues) as VariantKeys[];
    const variants = keys.reduce<Record<string, ApplyComposedVariantFn>>((acc, key) => {
        const l = normalizePercentageValue(defaultColorLightnessValues[key]);
        acc[key] = createComposedVariantFactoryFn(([h, s, _, a]) => [h, s, l, a]);
        return acc;
    }, {});

    return useComposedVariantsFactory<RootKey, ColorVariantKeys<VariantKeys>>(composed, variants, {
        ...defaultColorFactoryOptions,
        ...options
    });
}

/**
 * Creates color tint variants for the given color
 */
export function useColorTintVariantsFactory<RootKey extends string>(
    composed: Variable<RootKey>,
    options = defaultDefinitionOptions
) {
    type VariantKeys = keyof typeof defaultColorTintValues;

    const keys = Object.keys(defaultColorTintValues) as VariantKeys[];
    const variants = keys.reduce<Record<string, ApplyComposedVariantFn>>((acc, key) => {
        const changeInLightness = defaultColorTintValues[key];
        acc[key] = createComposedVariantFactoryFn(([h, s, l, a]) => [
            h,
            s,
            add(l, changeInLightness),
            a
        ]);
        return acc;
    }, {});

    return useComposedVariantsFactory<RootKey, ColorVariantKeys<VariantKeys>>(composed, variants, {
        ...defaultColorFactoryOptions,
        ...options
    });
}

/**
 * Creates color shade variants for the given color
 */
export function useColorShadeVariantsFactory<RootKey extends string>(
    composed: Variable<RootKey>,
    options = defaultDefinitionOptions
) {
    type VariantKeys = keyof typeof defaultColorShadeValues;

    const keys = Object.keys(defaultColorShadeValues) as VariantKeys[];
    const variants = keys.reduce<Record<string, ApplyComposedVariantFn>>((acc, key) => {
        const changeInLightness = defaultColorShadeValues[key];
        acc[key] = createComposedVariantFactoryFn(([h, s, l, a]) => [
            h,
            s,
            subtract(l, changeInLightness),
            a
        ]);
        return acc;
    }, {});

    return useComposedVariantsFactory<RootKey, ColorVariantKeys<VariantKeys>>(composed, variants, {
        ...defaultColorFactoryOptions,
        ...options
    });
}

/**
 * Composables
 */

export function useBaseColors(options = defaultDefinitionOptions) {
    const { colorRedH, colorRedS, colorRedL, colorRedA, colorRed } = color(
        'color-red',
        '#f55252',
        options
    );
    const { colorOrangeH, colorOrangeS, colorOrangeL, colorOrangeA, colorOrange } = color(
        'color-orange',
        '#f98e5a',
        options
    );
    const { colorYellowH, colorYellowS, colorYellowL, colorYellowA, colorYellow } = color(
        'color-yellow',
        '#ffda77',
        options
    );
    const { colorGreenH, colorGreenS, colorGreenL, colorGreenA, colorGreen } = color(
        'color-green',
        '#2fb079',
        options
    );
    const { colorTealH, colorTealS, colorTealL, colorTealA, colorTeal } = color(
        'color-teal',
        '#48b4a9',
        options
    );
    const { colorBlueH, colorBlueS, colorBlueL, colorBlueA, colorBlue } = color(
        'color-blue',
        '#178bb2',
        options
    );
    const { colorIndigoH, colorIndigoS, colorIndigoL, colorIndigoA, colorIndigo } = color(
        'color-indigo',
        '#4c6ef5',
        options
    );
    const { colorPurpleH, colorPurpleS, colorPurpleL, colorPurpleA, colorPurple } = color(
        'color-purple',
        '#8268ae',
        options
    );
    const { colorPinkH, colorPinkS, colorPinkL, colorPinkA, colorPink } = color(
        'color-pink',
        '#fc778a',
        options
    );

    return {
        colorRedH,
        colorRedS,
        colorRedL,
        colorRedA,
        colorRed,
        colorOrangeH,
        colorOrangeS,
        colorOrangeL,
        colorOrangeA,
        colorOrange,
        colorYellowH,
        colorYellowS,
        colorYellowL,
        colorYellowA,
        colorYellow,
        colorGreenH,
        colorGreenS,
        colorGreenL,
        colorGreenA,
        colorGreen,
        colorTealH,
        colorTealS,
        colorTealL,
        colorTealA,
        colorTeal,
        colorBlueH,
        colorBlueS,
        colorBlueL,
        colorBlueA,
        colorBlue,
        colorIndigoH,
        colorIndigoS,
        colorIndigoL,
        colorIndigoA,
        colorIndigo,
        colorPurpleH,
        colorPurpleS,
        colorPurpleL,
        colorPurpleA,
        colorPurple,
        colorPinkH,
        colorPinkS,
        colorPinkL,
        colorPinkA,
        colorPink
    };
}

export function useNeutralColors(options = defaultDefinitionOptions) {
    const { colorWhiteH, colorWhiteS, colorWhiteL, colorWhiteA, colorWhite } = color(
        'color-white',
        '#ffffff',
        options
    );
    const { colorBlackH, colorBlackS, colorBlackL, colorBlackA, colorBlack } = color(
        'color-black',
        '#000000',
        options
    );

    const { colorGrayH, colorGrayS, colorGrayL, colorGrayA, colorGray } = color(
        'color-gray',
        '#8e9fa4',
        options
    );

    const {
        colorGray100H,
        colorGray100S,
        colorGray100L,
        colorGray100A,
        colorGray100,
        colorGray200H,
        colorGray200S,
        colorGray200L,
        colorGray200A,
        colorGray200,
        colorGray300H,
        colorGray300S,
        colorGray300L,
        colorGray300A,
        colorGray300,
        colorGray400H,
        colorGray400S,
        colorGray400L,
        colorGray400A,
        colorGray400,
        colorGray500H,
        colorGray500S,
        colorGray500L,
        colorGray500A,
        colorGray500,
        colorGray600H,
        colorGray600S,
        colorGray600L,
        colorGray600A,
        colorGray600,
        colorGray700H,
        colorGray700S,
        colorGray700L,
        colorGray700A,
        colorGray700,
        colorGray800H,
        colorGray800S,
        colorGray800L,
        colorGray800A,
        colorGray800,
        colorGray900H,
        colorGray900S,
        colorGray900L,
        colorGray900A,
        colorGray900
    } = useColorLightnessVariantsFactory(colorGray, options);

    return {
        colorWhiteH,
        colorWhiteS,
        colorWhiteL,
        colorWhiteA,
        colorWhite,
        colorBlackH,
        colorBlackS,
        colorBlackL,
        colorBlackA,
        colorBlack,
        colorGrayH,
        colorGrayS,
        colorGrayL,
        colorGrayA,
        colorGray,
        colorGray100H,
        colorGray100S,
        colorGray100L,
        colorGray100A,
        colorGray100,
        colorGray200H,
        colorGray200S,
        colorGray200L,
        colorGray200A,
        colorGray200,
        colorGray300H,
        colorGray300S,
        colorGray300L,
        colorGray300A,
        colorGray300,
        colorGray400H,
        colorGray400S,
        colorGray400L,
        colorGray400A,
        colorGray400,
        colorGray500H,
        colorGray500S,
        colorGray500L,
        colorGray500A,
        colorGray500,
        colorGray600H,
        colorGray600S,
        colorGray600L,
        colorGray600A,
        colorGray600,
        colorGray700H,
        colorGray700S,
        colorGray700L,
        colorGray700A,
        colorGray700,
        colorGray800H,
        colorGray800S,
        colorGray800L,
        colorGray800A,
        colorGray800,
        colorGray900H,
        colorGray900S,
        colorGray900L,
        colorGray900A,
        colorGray900
    };
}

export function useBrandColors(options = defaultDefinitionOptions) {
    const {
        colorBlueH,
        colorBlueS,
        colorBlueL,
        colorBlueA,
        colorPurpleH,
        colorPurpleS,
        colorPurpleL,
        colorPurpleA,
        colorTealH,
        colorTealS,
        colorTealL,
        colorTealA,
        colorGreenH,
        colorGreenS,
        colorGreenL,
        colorGreenA,
        colorYellowH,
        colorYellowS,
        colorYellowL,
        colorYellowA,
        colorRedH,
        colorRedS,
        colorRedL,
        colorRedA
    } = useBaseColors();

    const {
        colorGray100H,
        colorGray100S,
        colorGray100L,
        colorGray100A,
        colorGray800H,
        colorGray800S,
        colorGray800L,
        colorGray800A
    } = useNeutralColors();

    const { colorPrimaryH, colorPrimaryS, colorPrimaryL, colorPrimaryA, colorPrimary } = color(
        'color-primary',
        [ref(colorBlueH), ref(colorBlueS), ref(colorBlueL), ref(colorBlueA)],
        options
    );

    const { colorSecondaryH, colorSecondaryS, colorSecondaryL, colorSecondaryA, colorSecondary } =
        color(
            'color-secondary',
            [ref(colorPurpleH), ref(colorPurpleS), ref(colorPurpleL), ref(colorPurpleA)],
            options
        );

    const { colorInfoH, colorInfoS, colorInfoL, colorInfoA, colorInfo } = color(
        'color-info',
        [ref(colorTealH), ref(colorTealS), ref(colorTealL), ref(colorTealA)],
        options
    );

    const { colorSuccessH, colorSuccessS, colorSuccessL, colorSuccessA, colorSuccess } = color(
        'color-success',
        [ref(colorGreenH), ref(colorGreenS), ref(colorGreenL), ref(colorGreenA)],
        options
    );

    const { colorWarningH, colorWarningS, colorWarningL, colorWarningA, colorWarning } = color(
        'color-warning',
        [ref(colorYellowH), ref(colorYellowS), ref(colorYellowL), ref(colorYellowA)],
        options
    );

    const { colorDangerH, colorDangerS, colorDangerL, colorDangerA, colorDanger } = color(
        'color-danger',
        [ref(colorRedH), ref(colorRedS), ref(colorRedL), ref(colorRedA)],
        options
    );

    const { colorLightH, colorLightS, colorLightL, colorLightA, colorLight } = color(
        'color-light',
        [ref(colorGray100H), ref(colorGray100S), ref(colorGray100L), ref(colorGray100A)],
        options
    );

    const { colorDarkH, colorDarkS, colorDarkL, colorDarkA, colorDark } = color(
        'color-dark',
        [ref(colorGray800H), ref(colorGray800S), ref(colorGray800L), ref(colorGray800A)],
        options
    );

    return {
        colorPrimaryH,
        colorPrimaryS,
        colorPrimaryL,
        colorPrimaryA,
        colorPrimary,
        colorSecondaryH,
        colorSecondaryS,
        colorSecondaryL,
        colorSecondaryA,
        colorSecondary,
        colorInfoH,
        colorInfoS,
        colorInfoL,
        colorInfoA,
        colorInfo,
        colorSuccessH,
        colorSuccessS,
        colorSuccessL,
        colorSuccessA,
        colorSuccess,
        colorWarningH,
        colorWarningS,
        colorWarningL,
        colorWarningA,
        colorWarning,
        colorDangerH,
        colorDangerS,
        colorDangerL,
        colorDangerA,
        colorDanger,
        colorLightH,
        colorLightS,
        colorLightL,
        colorLightA,
        colorLight,
        colorDarkH,
        colorDarkS,
        colorDarkL,
        colorDarkA,
        colorDark
    };
}

export function useBrandColorVariants(options = defaultDefinitionOptions) {
    const {
        colorPrimary,
        colorSecondary,
        colorInfo,
        colorSuccess,
        colorWarning,
        colorDanger,
        colorLight,
        colorDark
    } = useBrandColors(options);

    const {
        colorPrimary100H,
        colorPrimary100S,
        colorPrimary100L,
        colorPrimary100A,
        colorPrimary100,
        colorPrimary200H,
        colorPrimary200S,
        colorPrimary200L,
        colorPrimary200A,
        colorPrimary200,
        colorPrimary300H,
        colorPrimary300S,
        colorPrimary300L,
        colorPrimary300A,
        colorPrimary300,
        colorPrimary400H,
        colorPrimary400S,
        colorPrimary400L,
        colorPrimary400A,
        colorPrimary400,
        colorPrimary500H,
        colorPrimary500S,
        colorPrimary500L,
        colorPrimary500A,
        colorPrimary500,
        colorPrimary600H,
        colorPrimary600S,
        colorPrimary600L,
        colorPrimary600A,
        colorPrimary600,
        colorPrimary700H,
        colorPrimary700S,
        colorPrimary700L,
        colorPrimary700A,
        colorPrimary700,
        colorPrimary800H,
        colorPrimary800S,
        colorPrimary800L,
        colorPrimary800A,
        colorPrimary800,
        colorPrimary900H,
        colorPrimary900S,
        colorPrimary900L,
        colorPrimary900A,
        colorPrimary900
    } = useColorLightnessVariantsFactory(colorPrimary, options);

    const {
        colorPrimaryTint50H,
        colorPrimaryTint50S,
        colorPrimaryTint50L,
        colorPrimaryTint50A,
        colorPrimaryTint50,
        colorPrimaryTint100H,
        colorPrimaryTint100S,
        colorPrimaryTint100L,
        colorPrimaryTint100A,
        colorPrimaryTint100,
        colorPrimaryTint150H,
        colorPrimaryTint150S,
        colorPrimaryTint150L,
        colorPrimaryTint150A,
        colorPrimaryTint150
    } = useColorTintVariantsFactory(colorPrimary, options);

    const {
        colorPrimaryShade50H,
        colorPrimaryShade50S,
        colorPrimaryShade50L,
        colorPrimaryShade50A,
        colorPrimaryShade50,
        colorPrimaryShade100H,
        colorPrimaryShade100S,
        colorPrimaryShade100L,
        colorPrimaryShade100A,
        colorPrimaryShade100,
        colorPrimaryShade150H,
        colorPrimaryShade150S,
        colorPrimaryShade150L,
        colorPrimaryShade150A,
        colorPrimaryShade150
    } = useColorShadeVariantsFactory(colorPrimary, options);

    const {
        colorSecondary100H,
        colorSecondary100S,
        colorSecondary100L,
        colorSecondary100A,
        colorSecondary100,
        colorSecondary200H,
        colorSecondary200S,
        colorSecondary200L,
        colorSecondary200A,
        colorSecondary200,
        colorSecondary300H,
        colorSecondary300S,
        colorSecondary300L,
        colorSecondary300A,
        colorSecondary300,
        colorSecondary400H,
        colorSecondary400S,
        colorSecondary400L,
        colorSecondary400A,
        colorSecondary400,
        colorSecondary500H,
        colorSecondary500S,
        colorSecondary500L,
        colorSecondary500A,
        colorSecondary500,
        colorSecondary600H,
        colorSecondary600S,
        colorSecondary600L,
        colorSecondary600A,
        colorSecondary600,
        colorSecondary700H,
        colorSecondary700S,
        colorSecondary700L,
        colorSecondary700A,
        colorSecondary700,
        colorSecondary800H,
        colorSecondary800S,
        colorSecondary800L,
        colorSecondary800A,
        colorSecondary800,
        colorSecondary900H,
        colorSecondary900S,
        colorSecondary900L,
        colorSecondary900A,
        colorSecondary900
    } = useColorLightnessVariantsFactory(colorSecondary, options);

    const {
        colorSecondaryTint50H,
        colorSecondaryTint50S,
        colorSecondaryTint50L,
        colorSecondaryTint50A,
        colorSecondaryTint50,
        colorSecondaryTint100H,
        colorSecondaryTint100S,
        colorSecondaryTint100L,
        colorSecondaryTint100A,
        colorSecondaryTint100,
        colorSecondaryTint150H,
        colorSecondaryTint150S,
        colorSecondaryTint150L,
        colorSecondaryTint150A,
        colorSecondaryTint150
    } = useColorTintVariantsFactory(colorSecondary, options);

    const {
        colorSecondaryShade50H,
        colorSecondaryShade50S,
        colorSecondaryShade50L,
        colorSecondaryShade50A,
        colorSecondaryShade50,
        colorSecondaryShade100H,
        colorSecondaryShade100S,
        colorSecondaryShade100L,
        colorSecondaryShade100A,
        colorSecondaryShade100,
        colorSecondaryShade150H,
        colorSecondaryShade150S,
        colorSecondaryShade150L,
        colorSecondaryShade150A,
        colorSecondaryShade150
    } = useColorShadeVariantsFactory(colorSecondary, options);

    const {
        colorInfo100H,
        colorInfo100S,
        colorInfo100L,
        colorInfo100A,
        colorInfo100,
        colorInfo200H,
        colorInfo200S,
        colorInfo200L,
        colorInfo200A,
        colorInfo200,
        colorInfo300H,
        colorInfo300S,
        colorInfo300L,
        colorInfo300A,
        colorInfo300,
        colorInfo400H,
        colorInfo400S,
        colorInfo400L,
        colorInfo400A,
        colorInfo400,
        colorInfo500H,
        colorInfo500S,
        colorInfo500L,
        colorInfo500A,
        colorInfo500,
        colorInfo600H,
        colorInfo600S,
        colorInfo600L,
        colorInfo600A,
        colorInfo600,
        colorInfo700H,
        colorInfo700S,
        colorInfo700L,
        colorInfo700A,
        colorInfo700,
        colorInfo800H,
        colorInfo800S,
        colorInfo800L,
        colorInfo800A,
        colorInfo800,
        colorInfo900H,
        colorInfo900S,
        colorInfo900L,
        colorInfo900A,
        colorInfo900
    } = useColorLightnessVariantsFactory(colorInfo, options);

    const {
        colorInfoTint50H,
        colorInfoTint50S,
        colorInfoTint50L,
        colorInfoTint50A,
        colorInfoTint50,
        colorInfoTint100H,
        colorInfoTint100S,
        colorInfoTint100L,
        colorInfoTint100A,
        colorInfoTint100,
        colorInfoTint150H,
        colorInfoTint150S,
        colorInfoTint150L,
        colorInfoTint150A,
        colorInfoTint150
    } = useColorTintVariantsFactory(colorInfo, options);

    const {
        colorInfoShade50H,
        colorInfoShade50S,
        colorInfoShade50L,
        colorInfoShade50A,
        colorInfoShade50,
        colorInfoShade100H,
        colorInfoShade100S,
        colorInfoShade100L,
        colorInfoShade100A,
        colorInfoShade100,
        colorInfoShade150H,
        colorInfoShade150S,
        colorInfoShade150L,
        colorInfoShade150A,
        colorInfoShade150
    } = useColorShadeVariantsFactory(colorInfo, options);

    const {
        colorSuccess100H,
        colorSuccess100S,
        colorSuccess100L,
        colorSuccess100A,
        colorSuccess100,
        colorSuccess200H,
        colorSuccess200S,
        colorSuccess200L,
        colorSuccess200A,
        colorSuccess200,
        colorSuccess300H,
        colorSuccess300S,
        colorSuccess300L,
        colorSuccess300A,
        colorSuccess300,
        colorSuccess400H,
        colorSuccess400S,
        colorSuccess400L,
        colorSuccess400A,
        colorSuccess400,
        colorSuccess500H,
        colorSuccess500S,
        colorSuccess500L,
        colorSuccess500A,
        colorSuccess500,
        colorSuccess600H,
        colorSuccess600S,
        colorSuccess600L,
        colorSuccess600A,
        colorSuccess600,
        colorSuccess700H,
        colorSuccess700S,
        colorSuccess700L,
        colorSuccess700A,
        colorSuccess700,
        colorSuccess800H,
        colorSuccess800S,
        colorSuccess800L,
        colorSuccess800A,
        colorSuccess800,
        colorSuccess900H,
        colorSuccess900S,
        colorSuccess900L,
        colorSuccess900A,
        colorSuccess900
    } = useColorLightnessVariantsFactory(colorSuccess, options);

    const {
        colorSuccessTint50H,
        colorSuccessTint50S,
        colorSuccessTint50L,
        colorSuccessTint50A,
        colorSuccessTint50,
        colorSuccessTint100H,
        colorSuccessTint100S,
        colorSuccessTint100L,
        colorSuccessTint100A,
        colorSuccessTint100,
        colorSuccessTint150H,
        colorSuccessTint150S,
        colorSuccessTint150L,
        colorSuccessTint150A,
        colorSuccessTint150
    } = useColorTintVariantsFactory(colorSuccess, options);

    const {
        colorSuccessShade50H,
        colorSuccessShade50S,
        colorSuccessShade50L,
        colorSuccessShade50A,
        colorSuccessShade50,
        colorSuccessShade100H,
        colorSuccessShade100S,
        colorSuccessShade100L,
        colorSuccessShade100A,
        colorSuccessShade100,
        colorSuccessShade150H,
        colorSuccessShade150S,
        colorSuccessShade150L,
        colorSuccessShade150A,
        colorSuccessShade150
    } = useColorShadeVariantsFactory(colorSuccess, options);

    const {
        colorWarning100H,
        colorWarning100S,
        colorWarning100L,
        colorWarning100A,
        colorWarning100,
        colorWarning200H,
        colorWarning200S,
        colorWarning200L,
        colorWarning200A,
        colorWarning200,
        colorWarning300H,
        colorWarning300S,
        colorWarning300L,
        colorWarning300A,
        colorWarning300,
        colorWarning400H,
        colorWarning400S,
        colorWarning400L,
        colorWarning400A,
        colorWarning400,
        colorWarning500H,
        colorWarning500S,
        colorWarning500L,
        colorWarning500A,
        colorWarning500,
        colorWarning600H,
        colorWarning600S,
        colorWarning600L,
        colorWarning600A,
        colorWarning600,
        colorWarning700H,
        colorWarning700S,
        colorWarning700L,
        colorWarning700A,
        colorWarning700,
        colorWarning800H,
        colorWarning800S,
        colorWarning800L,
        colorWarning800A,
        colorWarning800,
        colorWarning900H,
        colorWarning900S,
        colorWarning900L,
        colorWarning900A,
        colorWarning900
    } = useColorLightnessVariantsFactory(colorWarning, options);

    const {
        colorWarningTint50H,
        colorWarningTint50S,
        colorWarningTint50L,
        colorWarningTint50A,
        colorWarningTint50,
        colorWarningTint100H,
        colorWarningTint100S,
        colorWarningTint100L,
        colorWarningTint100A,
        colorWarningTint100,
        colorWarningTint150H,
        colorWarningTint150S,
        colorWarningTint150L,
        colorWarningTint150A,
        colorWarningTint150
    } = useColorTintVariantsFactory(colorWarning, options);

    const {
        colorWarningShade50H,
        colorWarningShade50S,
        colorWarningShade50L,
        colorWarningShade50A,
        colorWarningShade50,
        colorWarningShade100H,
        colorWarningShade100S,
        colorWarningShade100L,
        colorWarningShade100A,
        colorWarningShade100,
        colorWarningShade150H,
        colorWarningShade150S,
        colorWarningShade150L,
        colorWarningShade150A,
        colorWarningShade150
    } = useColorShadeVariantsFactory(colorWarning, options);

    const {
        colorDanger100H,
        colorDanger100S,
        colorDanger100L,
        colorDanger100A,
        colorDanger100,
        colorDanger200H,
        colorDanger200S,
        colorDanger200L,
        colorDanger200A,
        colorDanger200,
        colorDanger300H,
        colorDanger300S,
        colorDanger300L,
        colorDanger300A,
        colorDanger300,
        colorDanger400H,
        colorDanger400S,
        colorDanger400L,
        colorDanger400A,
        colorDanger400,
        colorDanger500H,
        colorDanger500S,
        colorDanger500L,
        colorDanger500A,
        colorDanger500,
        colorDanger600H,
        colorDanger600S,
        colorDanger600L,
        colorDanger600A,
        colorDanger600,
        colorDanger700H,
        colorDanger700S,
        colorDanger700L,
        colorDanger700A,
        colorDanger700,
        colorDanger800H,
        colorDanger800S,
        colorDanger800L,
        colorDanger800A,
        colorDanger800,
        colorDanger900H,
        colorDanger900S,
        colorDanger900L,
        colorDanger900A,
        colorDanger900
    } = useColorLightnessVariantsFactory(colorDanger, options);

    const {
        colorDangerTint50H,
        colorDangerTint50S,
        colorDangerTint50L,
        colorDangerTint50A,
        colorDangerTint50,
        colorDangerTint100H,
        colorDangerTint100S,
        colorDangerTint100L,
        colorDangerTint100A,
        colorDangerTint100,
        colorDangerTint150H,
        colorDangerTint150S,
        colorDangerTint150L,
        colorDangerTint150A,
        colorDangerTint150
    } = useColorTintVariantsFactory(colorDanger, options);

    const {
        colorDangerShade50H,
        colorDangerShade50S,
        colorDangerShade50L,
        colorDangerShade50A,
        colorDangerShade50,
        colorDangerShade100H,
        colorDangerShade100S,
        colorDangerShade100L,
        colorDangerShade100A,
        colorDangerShade100,
        colorDangerShade150H,
        colorDangerShade150S,
        colorDangerShade150L,
        colorDangerShade150A,
        colorDangerShade150
    } = useColorShadeVariantsFactory(colorDanger, options);

    const {
        colorLightShade50H,
        colorLightShade50S,
        colorLightShade50L,
        colorLightShade50A,
        colorLightShade50,
        colorLightShade100H,
        colorLightShade100S,
        colorLightShade100L,
        colorLightShade100A,
        colorLightShade100,
        colorLightShade150H,
        colorLightShade150S,
        colorLightShade150L,
        colorLightShade150A,
        colorLightShade150
    } = useColorShadeVariantsFactory(colorLight, options);

    const {
        colorLightTint50H,
        colorLightTint50S,
        colorLightTint50L,
        colorLightTint50A,
        colorLightTint50,
        colorLightTint100H,
        colorLightTint100S,
        colorLightTint100L,
        colorLightTint100A,
        colorLightTint100,
        colorLightTint150H,
        colorLightTint150S,
        colorLightTint150L,
        colorLightTint150A,
        colorLightTint150
    } = useColorTintVariantsFactory(colorLight, options);

    const {
        colorDarkTint50H,
        colorDarkTint50S,
        colorDarkTint50L,
        colorDarkTint50A,
        colorDarkTint50,
        colorDarkTint100H,
        colorDarkTint100S,
        colorDarkTint100L,
        colorDarkTint100A,
        colorDarkTint100,
        colorDarkTint150H,
        colorDarkTint150S,
        colorDarkTint150L,
        colorDarkTint150A,
        colorDarkTint150
    } = useColorTintVariantsFactory(colorDark, options);

    const {
        colorDarkShade50H,
        colorDarkShade50S,
        colorDarkShade50L,
        colorDarkShade50A,
        colorDarkShade50,
        colorDarkShade100H,
        colorDarkShade100S,
        colorDarkShade100L,
        colorDarkShade100A,
        colorDarkShade100,
        colorDarkShade150H,
        colorDarkShade150S,
        colorDarkShade150L,
        colorDarkShade150A,
        colorDarkShade150
    } = useColorShadeVariantsFactory(colorDark, options);

    return {
        colorPrimary100H,
        colorPrimary100S,
        colorPrimary100L,
        colorPrimary100A,
        colorPrimary100,
        colorPrimary200H,
        colorPrimary200S,
        colorPrimary200L,
        colorPrimary200A,
        colorPrimary200,
        colorPrimary300H,
        colorPrimary300S,
        colorPrimary300L,
        colorPrimary300A,
        colorPrimary300,
        colorPrimary400H,
        colorPrimary400S,
        colorPrimary400L,
        colorPrimary400A,
        colorPrimary400,
        colorPrimary500H,
        colorPrimary500S,
        colorPrimary500L,
        colorPrimary500A,
        colorPrimary500,
        colorPrimary600H,
        colorPrimary600S,
        colorPrimary600L,
        colorPrimary600A,
        colorPrimary600,
        colorPrimary700H,
        colorPrimary700S,
        colorPrimary700L,
        colorPrimary700A,
        colorPrimary700,
        colorPrimary800H,
        colorPrimary800S,
        colorPrimary800L,
        colorPrimary800A,
        colorPrimary800,
        colorPrimary900H,
        colorPrimary900S,
        colorPrimary900L,
        colorPrimary900A,
        colorPrimary900,
        colorPrimaryTint50H,
        colorPrimaryTint50S,
        colorPrimaryTint50L,
        colorPrimaryTint50A,
        colorPrimaryTint50,
        colorPrimaryTint100H,
        colorPrimaryTint100S,
        colorPrimaryTint100L,
        colorPrimaryTint100A,
        colorPrimaryTint100,
        colorPrimaryTint150H,
        colorPrimaryTint150S,
        colorPrimaryTint150L,
        colorPrimaryTint150A,
        colorPrimaryTint150,
        colorPrimaryShade50H,
        colorPrimaryShade50S,
        colorPrimaryShade50L,
        colorPrimaryShade50A,
        colorPrimaryShade50,
        colorPrimaryShade100H,
        colorPrimaryShade100S,
        colorPrimaryShade100L,
        colorPrimaryShade100A,
        colorPrimaryShade100,
        colorPrimaryShade150H,
        colorPrimaryShade150S,
        colorPrimaryShade150L,
        colorPrimaryShade150A,
        colorPrimaryShade150,
        colorSecondary100H,
        colorSecondary100S,
        colorSecondary100L,
        colorSecondary100A,
        colorSecondary100,
        colorSecondary200H,
        colorSecondary200S,
        colorSecondary200L,
        colorSecondary200A,
        colorSecondary200,
        colorSecondary300H,
        colorSecondary300S,
        colorSecondary300L,
        colorSecondary300A,
        colorSecondary300,
        colorSecondary400H,
        colorSecondary400S,
        colorSecondary400L,
        colorSecondary400A,
        colorSecondary400,
        colorSecondary500H,
        colorSecondary500S,
        colorSecondary500L,
        colorSecondary500A,
        colorSecondary500,
        colorSecondary600H,
        colorSecondary600S,
        colorSecondary600L,
        colorSecondary600A,
        colorSecondary600,
        colorSecondary700H,
        colorSecondary700S,
        colorSecondary700L,
        colorSecondary700A,
        colorSecondary700,
        colorSecondary800H,
        colorSecondary800S,
        colorSecondary800L,
        colorSecondary800A,
        colorSecondary800,
        colorSecondary900H,
        colorSecondary900S,
        colorSecondary900L,
        colorSecondary900A,
        colorSecondary900,
        colorSecondaryTint50H,
        colorSecondaryTint50S,
        colorSecondaryTint50L,
        colorSecondaryTint50A,
        colorSecondaryTint50,
        colorSecondaryTint100H,
        colorSecondaryTint100S,
        colorSecondaryTint100L,
        colorSecondaryTint100A,
        colorSecondaryTint100,
        colorSecondaryTint150H,
        colorSecondaryTint150S,
        colorSecondaryTint150L,
        colorSecondaryTint150A,
        colorSecondaryTint150,
        colorSecondaryShade50H,
        colorSecondaryShade50S,
        colorSecondaryShade50L,
        colorSecondaryShade50A,
        colorSecondaryShade50,
        colorSecondaryShade100H,
        colorSecondaryShade100S,
        colorSecondaryShade100L,
        colorSecondaryShade100A,
        colorSecondaryShade100,
        colorSecondaryShade150H,
        colorSecondaryShade150S,
        colorSecondaryShade150L,
        colorSecondaryShade150A,
        colorSecondaryShade150,
        colorInfo100H,
        colorInfo100S,
        colorInfo100L,
        colorInfo100A,
        colorInfo100,
        colorInfo200H,
        colorInfo200S,
        colorInfo200L,
        colorInfo200A,
        colorInfo200,
        colorInfo300H,
        colorInfo300S,
        colorInfo300L,
        colorInfo300A,
        colorInfo300,
        colorInfo400H,
        colorInfo400S,
        colorInfo400L,
        colorInfo400A,
        colorInfo400,
        colorInfo500H,
        colorInfo500S,
        colorInfo500L,
        colorInfo500A,
        colorInfo500,
        colorInfo600H,
        colorInfo600S,
        colorInfo600L,
        colorInfo600A,
        colorInfo600,
        colorInfo700H,
        colorInfo700S,
        colorInfo700L,
        colorInfo700A,
        colorInfo700,
        colorInfo800H,
        colorInfo800S,
        colorInfo800L,
        colorInfo800A,
        colorInfo800,
        colorInfo900H,
        colorInfo900S,
        colorInfo900L,
        colorInfo900A,
        colorInfo900,
        colorInfoTint50H,
        colorInfoTint50S,
        colorInfoTint50L,
        colorInfoTint50A,
        colorInfoTint50,
        colorInfoTint100H,
        colorInfoTint100S,
        colorInfoTint100L,
        colorInfoTint100A,
        colorInfoTint100,
        colorInfoTint150H,
        colorInfoTint150S,
        colorInfoTint150L,
        colorInfoTint150A,
        colorInfoTint150,
        colorInfoShade50H,
        colorInfoShade50S,
        colorInfoShade50L,
        colorInfoShade50A,
        colorInfoShade50,
        colorInfoShade100H,
        colorInfoShade100S,
        colorInfoShade100L,
        colorInfoShade100A,
        colorInfoShade100,
        colorInfoShade150H,
        colorInfoShade150S,
        colorInfoShade150L,
        colorInfoShade150A,
        colorInfoShade150,
        colorSuccess100H,
        colorSuccess100S,
        colorSuccess100L,
        colorSuccess100A,
        colorSuccess100,
        colorSuccess200H,
        colorSuccess200S,
        colorSuccess200L,
        colorSuccess200A,
        colorSuccess200,
        colorSuccess300H,
        colorSuccess300S,
        colorSuccess300L,
        colorSuccess300A,
        colorSuccess300,
        colorSuccess400H,
        colorSuccess400S,
        colorSuccess400L,
        colorSuccess400A,
        colorSuccess400,
        colorSuccess500H,
        colorSuccess500S,
        colorSuccess500L,
        colorSuccess500A,
        colorSuccess500,
        colorSuccess600H,
        colorSuccess600S,
        colorSuccess600L,
        colorSuccess600A,
        colorSuccess600,
        colorSuccess700H,
        colorSuccess700S,
        colorSuccess700L,
        colorSuccess700A,
        colorSuccess700,
        colorSuccess800H,
        colorSuccess800S,
        colorSuccess800L,
        colorSuccess800A,
        colorSuccess800,
        colorSuccess900H,
        colorSuccess900S,
        colorSuccess900L,
        colorSuccess900A,
        colorSuccess900,
        colorSuccessTint50H,
        colorSuccessTint50S,
        colorSuccessTint50L,
        colorSuccessTint50A,
        colorSuccessTint50,
        colorSuccessTint100H,
        colorSuccessTint100S,
        colorSuccessTint100L,
        colorSuccessTint100A,
        colorSuccessTint100,
        colorSuccessTint150H,
        colorSuccessTint150S,
        colorSuccessTint150L,
        colorSuccessTint150A,
        colorSuccessTint150,
        colorSuccessShade50H,
        colorSuccessShade50S,
        colorSuccessShade50L,
        colorSuccessShade50A,
        colorSuccessShade50,
        colorSuccessShade100H,
        colorSuccessShade100S,
        colorSuccessShade100L,
        colorSuccessShade100A,
        colorSuccessShade100,
        colorSuccessShade150H,
        colorSuccessShade150S,
        colorSuccessShade150L,
        colorSuccessShade150A,
        colorSuccessShade150,
        colorWarning100H,
        colorWarning100S,
        colorWarning100L,
        colorWarning100A,
        colorWarning100,
        colorWarning200H,
        colorWarning200S,
        colorWarning200L,
        colorWarning200A,
        colorWarning200,
        colorWarning300H,
        colorWarning300S,
        colorWarning300L,
        colorWarning300A,
        colorWarning300,
        colorWarning400H,
        colorWarning400S,
        colorWarning400L,
        colorWarning400A,
        colorWarning400,
        colorWarning500H,
        colorWarning500S,
        colorWarning500L,
        colorWarning500A,
        colorWarning500,
        colorWarning600H,
        colorWarning600S,
        colorWarning600L,
        colorWarning600A,
        colorWarning600,
        colorWarning700H,
        colorWarning700S,
        colorWarning700L,
        colorWarning700A,
        colorWarning700,
        colorWarning800H,
        colorWarning800S,
        colorWarning800L,
        colorWarning800A,
        colorWarning800,
        colorWarning900H,
        colorWarning900S,
        colorWarning900L,
        colorWarning900A,
        colorWarning900,
        colorWarningTint50H,
        colorWarningTint50S,
        colorWarningTint50L,
        colorWarningTint50A,
        colorWarningTint50,
        colorWarningTint100H,
        colorWarningTint100S,
        colorWarningTint100L,
        colorWarningTint100A,
        colorWarningTint100,
        colorWarningTint150H,
        colorWarningTint150S,
        colorWarningTint150L,
        colorWarningTint150A,
        colorWarningTint150,
        colorWarningShade50H,
        colorWarningShade50S,
        colorWarningShade50L,
        colorWarningShade50A,
        colorWarningShade50,
        colorWarningShade100H,
        colorWarningShade100S,
        colorWarningShade100L,
        colorWarningShade100A,
        colorWarningShade100,
        colorWarningShade150H,
        colorWarningShade150S,
        colorWarningShade150L,
        colorWarningShade150A,
        colorWarningShade150,
        colorDanger100H,
        colorDanger100S,
        colorDanger100L,
        colorDanger100A,
        colorDanger100,
        colorDanger200H,
        colorDanger200S,
        colorDanger200L,
        colorDanger200A,
        colorDanger200,
        colorDanger300H,
        colorDanger300S,
        colorDanger300L,
        colorDanger300A,
        colorDanger300,
        colorDanger400H,
        colorDanger400S,
        colorDanger400L,
        colorDanger400A,
        colorDanger400,
        colorDanger500H,
        colorDanger500S,
        colorDanger500L,
        colorDanger500A,
        colorDanger500,
        colorDanger600H,
        colorDanger600S,
        colorDanger600L,
        colorDanger600A,
        colorDanger600,
        colorDanger700H,
        colorDanger700S,
        colorDanger700L,
        colorDanger700A,
        colorDanger700,
        colorDanger800H,
        colorDanger800S,
        colorDanger800L,
        colorDanger800A,
        colorDanger800,
        colorDanger900H,
        colorDanger900S,
        colorDanger900L,
        colorDanger900A,
        colorDanger900,
        colorDangerTint50H,
        colorDangerTint50S,
        colorDangerTint50L,
        colorDangerTint50A,
        colorDangerTint50,
        colorDangerTint100H,
        colorDangerTint100S,
        colorDangerTint100L,
        colorDangerTint100A,
        colorDangerTint100,
        colorDangerTint150H,
        colorDangerTint150S,
        colorDangerTint150L,
        colorDangerTint150A,
        colorDangerTint150,
        colorDangerShade50H,
        colorDangerShade50S,
        colorDangerShade50L,
        colorDangerShade50A,
        colorDangerShade50,
        colorDangerShade100H,
        colorDangerShade100S,
        colorDangerShade100L,
        colorDangerShade100A,
        colorDangerShade100,
        colorDangerShade150H,
        colorDangerShade150S,
        colorDangerShade150L,
        colorDangerShade150A,
        colorDangerShade150,
        colorLightTint50H,
        colorLightTint50S,
        colorLightTint50L,
        colorLightTint50A,
        colorLightTint50,
        colorLightTint100H,
        colorLightTint100S,
        colorLightTint100L,
        colorLightTint100A,
        colorLightTint100,
        colorLightTint150H,
        colorLightTint150S,
        colorLightTint150L,
        colorLightTint150A,
        colorLightTint150,
        colorLightShade50H,
        colorLightShade50S,
        colorLightShade50L,
        colorLightShade50A,
        colorLightShade50,
        colorLightShade100H,
        colorLightShade100S,
        colorLightShade100L,
        colorLightShade100A,
        colorLightShade100,
        colorLightShade150H,
        colorLightShade150S,
        colorLightShade150L,
        colorLightShade150A,
        colorLightShade150,
        colorDarkTint50H,
        colorDarkTint50S,
        colorDarkTint50L,
        colorDarkTint50A,
        colorDarkTint50,
        colorDarkTint100H,
        colorDarkTint100S,
        colorDarkTint100L,
        colorDarkTint100A,
        colorDarkTint100,
        colorDarkTint150H,
        colorDarkTint150S,
        colorDarkTint150L,
        colorDarkTint150A,
        colorDarkTint150,
        colorDarkShade50H,
        colorDarkShade50S,
        colorDarkShade50L,
        colorDarkShade50A,
        colorDarkShade50,
        colorDarkShade100H,
        colorDarkShade100S,
        colorDarkShade100L,
        colorDarkShade100A,
        colorDarkShade100,
        colorDarkShade150H,
        colorDarkShade150S,
        colorDarkShade150L,
        colorDarkShade150A,
        colorDarkShade150
    };
}

export function useColors(options = defaultDefinitionOptions) {
    return {
        ...useBaseColors(options),
        ...useNeutralColors(options),
        ...useBrandColors(options),
        ...useBrandColorVariants(options)
    };
}
