import {
    DefinitionOptions,
    ref,
    selector,
    multiply,
    vref, nsvariables
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

export function useKbdConfig(options: DefinitionOptions) {
    const {
        colorDarkH,
        colorDarkS,
        colorDarkL,
        colorDarkA
    } = useBrandColors(options);
    const {
        contrastTextColorDarkH,
        contrastTextColorDarkS,
        contrastTextColorDarkL,
        contrastTextColorDarkA
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
        background: {
            h: ref(colorDarkH),
            s: ref(colorDarkS),
            l: ref(colorDarkL),
            a: ref(colorDarkA)
        },
        borderRadius: {
            topLeft: ref(borderTopLeftRadius),
            topRight: ref(borderTopRightRadius),
            bottomRight: ref(borderBottomRightRadius),
            bottomLeft: ref(borderBottomLeftRadius)
        },
        color: {
            h: ref(contrastTextColorDarkH),
            s: ref(contrastTextColorDarkS),
            l: ref(contrastTextColorDarkL),
            a: ref(contrastTextColorDarkA)
        },
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

export function useKbdVariables(options: DefinitionOptions) {
    return nsvariables(ns, useKbdConfig(options), options);
}

export function useKbdThemeSelectors(options: DefinitionOptions) {
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

export function useKbdTheme(options: DefinitionOptions) {
    useKbdVariables(options);
    useKbdThemeSelectors(options);
}
