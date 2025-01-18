import {
    DefinitionOptions,
    ref,
    selector,
    multiply,
    vref, nsvariables, defaultDefinitionOptions
} from '@inkline/core';
import {
    useBorderRadius,
    useBrandColors,
    useContrastTextColor,
    useFontFamily,
    useFontSize,
    useSpacing
} from '../../variables';

const ns = 'kbd';

export function useKbdConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        colorDark
    } = useBrandColors(options);
    const {
        contrastTextColorDark
    } = useContrastTextColor(options);
    const { fontSizeSm } = useFontSize(options);
    const { fontFamilyMonospace } = useFontFamily(options);
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius
    } = useBorderRadius(options);
    const { spacing } = useSpacing(options);

    return {
        background: ref(colorDark),
        borderRadius: {
            topLeft: ref(borderTopLeftRadius),
            topRight: ref(borderTopRightRadius),
            bottomRight: ref(borderBottomRightRadius),
            bottomLeft: ref(borderBottomLeftRadius)
        },
        color: ref(contrastTextColorDark),
        fontFamily: ref(fontFamilyMonospace),
        fontSize: ref(fontSizeSm),
        padding: {
            top: multiply(ref(spacing), 0.1875),
            right: multiply(ref(spacing), 0.375),
            bottom: multiply(ref(spacing), 0.1875),
            left: multiply(ref(spacing), 0.375)
        }
    };
}

export function useKbdVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useKbdConfig(options), options);
}

export function useKbdThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        kbdFontSize,
        kbdFontFamily,
        kbdPadding,
        kbdColor,
        kbdBackground,
        kbdBorderRadius
    } =
        useKbdVariables(options);

    selector('kbd', {
        fontSize: ref(kbdFontSize),
        fontFamily: ref(kbdFontFamily),
        padding: vref(kbdPadding),
        color: vref(kbdColor),
        background: vref(kbdBackground),
        borderRadius: vref(kbdBorderRadius),
        display: 'inline-block'
    }, options);

    selector('kbd > kbd', {
        padding: 0
    }, options);
}

export function useKbdTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useKbdVariables(options);
    useKbdThemeSelectors(options);
}
