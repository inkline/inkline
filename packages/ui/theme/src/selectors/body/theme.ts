import {
    darkThemeName,
    ref,
    selector,
    nsvariables, vref, DefinitionOptions
} from '@inkline/core';
import {
    useBrandColorVariants,
    useFontFamily,
    useFontSize,
    useLineHeight,
    useNeutralColors,
    useTextAlign,
    useTextColor,
    useTransition
} from '../../variables';

const ns = 'body';

const defaultBodyColor = 'light';
const defaultBodyColors = [
    'light',
    'dark'
] as const;

type BodyColorVariant = (typeof defaultBodyColors)[number];

export function useBodyThemeConfig(variant: BodyColorVariant, options: DefinitionOptions) {

    const {
        textColorH,
        textColorS,
        textColorL,
        textColorA
    } = useTextColor(options);
    const {
        colorWhiteH,
        colorWhiteS,
        colorWhiteL,
        colorWhiteA
    } = useNeutralColors(options);
    const {
        colorDarkShade50H,
        colorDarkShade50S,
        colorDarkShade50L,
        colorDarkShade50A
    } = useBrandColorVariants(options);
    const { fontSize } = useFontSize(options);
    const { fontFamilyBase } = useFontFamily(options);
    const { textAlignLeft } = useTextAlign(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);
    const { lineHeight } = useLineHeight(options);

    const common = {
        color: {
            h: ref(textColorH),
            s: ref(textColorS),
            l: ref(textColorL),
            a: ref(textColorA)
        },
        fontSize: ref(fontSize),
        fontFamily: ref(fontFamilyBase),
        lineHeight: ref(lineHeight),
        textAlign: ref(textAlignLeft),
        transition: {
            property: ref(transitionProperty),
            duration: ref(transitionDuration),
            timingFunction: ref(transitionTimingFunction)
        }
    };

    return {
        light: {
            ...common,
            background: {
                h: ref(colorWhiteH),
                s: ref(colorWhiteS),
                l: ref(colorWhiteL),
                a: ref(colorWhiteA)
            }
        },
        dark: {
            ...common,
            background: {
                h: ref(colorDarkShade50H),
                s: ref(colorDarkShade50S),
                l: ref(colorDarkShade50L),
                a: ref(colorDarkShade50A)
            }
        }
    }[variant];
}

export function useBodyThemeVariables(options: DefinitionOptions) {
    nsvariables(ns, useBodyThemeConfig('dark', options), {
        ...options,
        theme: darkThemeName
    });

    return nsvariables(ns, useBodyThemeConfig(defaultBodyColor, options), options);
}

export function useBodyThemeSelectors(options: DefinitionOptions) {
    const {
        bodyColor,
        bodyBackground,
        bodyFontSize,
        bodyFontFamily,
        bodyLineHeight,
        bodyTextAlign,
        bodyTransition
    } = useBodyThemeVariables(options);

    selector('body', {
        color: vref(bodyColor),
        backgroundColor: vref(bodyBackground),
        fontSize: ref(bodyFontSize),
        fontFamily: ref(bodyFontFamily),
        lineHeight: ref(bodyLineHeight),
        textAlign: ref(bodyTextAlign),
        transition: ref(bodyTransition),
        textSizeAdjust: '100%'
    }, options);
}

export function useBodyTheme(options: DefinitionOptions) {
    useBodyThemeVariables(options);
    useBodyThemeSelectors(options);
}
