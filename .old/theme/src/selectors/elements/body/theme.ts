import {
    darkThemeName,
    ref,
    selector,
    nsvariables, vref, DefinitionOptions, defaultDefinitionOptions
} from '@inkline/core';
import {
    useBrandColorVariants,
    useFontFamily,
    useFontSize, useLetterSpacing,
    useLineHeight,
    useNeutralColors,
    useTextAlign,
    useTextColor,
    useTransition
} from '../../../variables';

const ns = 'body';

const defaultBodyColor = 'light';
const defaultBodyColors = [
    'light',
    'dark'
] as const;

type BodyColorVariant = (typeof defaultBodyColors)[number];

export function useBodyThemeConfig(variant: BodyColorVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { textColor } = useTextColor(options);
    const { colorWhite } = useNeutralColors(options);
    const { colorDarkShade50 } = useBrandColorVariants(options);
    const { fontSize } = useFontSize(options);
    const { fontFamilyBase } = useFontFamily(options);
    const { textAlignLeft } = useTextAlign(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);
    const { lineHeight } = useLineHeight(options);
    const { letterSpacing } = useLetterSpacing(options);

    const common = {
        color: ref(textColor),
        fontSize: ref(fontSize),
        fontFamily: ref(fontFamilyBase),
        lineHeight: ref(lineHeight),
        letterSpacing: ref(letterSpacing),
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
            background: ref(colorWhite)
        },
        dark: {
            ...common,
            background: ref(colorDarkShade50)
        }
    }[variant];
}

export function useBodyThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    nsvariables(ns, useBodyThemeConfig('dark', options), {
        ...options,
        theme: darkThemeName
    });

    return nsvariables(ns, useBodyThemeConfig(defaultBodyColor, options), options);
}

export function useBodyThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        bodyColor,
        bodyBackground,
        bodyFontSize,
        bodyFontFamily,
        bodyLineHeight,
        bodyLetterSpacing,
        bodyTextAlign,
        bodyTransition
    } = useBodyThemeVariables(options);

    selector('body', {
        color: vref(bodyColor),
        backgroundColor: vref(bodyBackground),
        fontSize: ref(bodyFontSize),
        fontFamily: ref(bodyFontFamily),
        lineHeight: ref(bodyLineHeight),
        letterSpacing: ref(bodyLetterSpacing),
        textAlign: ref(bodyTextAlign),
        transition: ref(bodyTransition),
        textSizeAdjust: '100%'
    }, options);
}

export function useBodyTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useBodyThemeVariables(options);
    useBodyThemeSelectors(options);
}
