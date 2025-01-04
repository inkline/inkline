import {
    defaultDefinitionOptions,
    darkThemeName,
    ref,
    selector,
    nsvariables, vref
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

export function useBodyThemeConfig(variant?: BodyColorVariant) {
    const {
        textColorH,
        textColorS,
        textColorL,
        textColorA
    } = useTextColor();
    const {
        colorWhiteH,
        colorWhiteS,
        colorWhiteL,
        colorWhiteA
    } = useNeutralColors();
    const {
        colorDarkShade50H,
        colorDarkShade50S,
        colorDarkShade50L,
        colorDarkShade50A
    } = useBrandColorVariants();
    const { fontSize } = useFontSize();
    const { fontFamilyBase } = useFontFamily();
    const { textAlignLeft } = useTextAlign();
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition();
    const { lineHeight } = useLineHeight();

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
    }[variant ?? defaultBodyColor];
}

export function useBodyThemeVariables(options = defaultDefinitionOptions) {
    nsvariables(ns, useBodyThemeConfig('dark'), {
        ...options,
        theme: darkThemeName
    });

    return nsvariables(ns, useBodyThemeConfig(), options);
}

export function useBodyThemeSelectors() {
    const {
        bodyColor,
        bodyBackground,
        bodyFontSize,
        bodyFontFamily,
        bodyLineHeight,
        bodyTextAlign,
        bodyTransition
    } = useBodyThemeVariables();

    selector('body', {
        color: vref(bodyColor),
        backgroundColor: vref(bodyBackground),
        fontSize: ref(bodyFontSize),
        fontFamily: ref(bodyFontFamily),
        lineHeight: ref(bodyLineHeight),
        textAlign: ref(bodyTextAlign),
        transition: ref(bodyTransition),
        textSizeAdjust: '100%'
    });
}

export function useBodyTheme() {
    useBodyThemeVariables();
    useBodyThemeSelectors();
}
