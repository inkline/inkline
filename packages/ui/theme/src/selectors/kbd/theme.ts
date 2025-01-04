import {
    defaultDefinitionOptions,
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

export function useKbdConfig() {
    const {
        colorDarkH,
        colorDarkS,
        colorDarkL,
        colorDarkA
    } = useBrandColors();
    const {
        contrastTextColorDarkH,
        contrastTextColorDarkS,
        contrastTextColorDarkL,
        contrastTextColorDarkA
    } = useContrastTextColor();
    const { fontSizeSm } = useFontSize();
    const { fontFamilyMonospace } = useFontFamily();
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius
    } = useBorderRadius();
    const { spacing } = useSpacing();

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

export function useKbdVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useKbdConfig(), options);
}

export function useKbdThemeSelectors() {
    const {
        kbdFontSize,
        kbdFontFamily,
        kbdPadding,
        kbdColor,
        kbdBackground,
        kbdBorderRadius
    } =
        useKbdVariables();

    selector('kbd', {
        fontSize: ref(kbdFontSize),
        fontFamily: ref(kbdFontFamily),
        padding: vref(kbdPadding),
        color: vref(kbdColor),
        background: vref(kbdBackground),
        borderRadius: vref(kbdBorderRadius),
        display: 'inline-block'
    });

    selector('kbd > kbd', {
        padding: 0
    });
}

export function useKbdTheme() {
    useKbdVariables();
    useKbdThemeSelectors();
}
