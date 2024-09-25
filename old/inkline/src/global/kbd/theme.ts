import {
    defaultDefinitionOptions,
    namespace,
    nsvariable,
    ref,
    selector,
    useBorderRadiusBase,
    useBrandColors,
    useContrastTextColor,
    useFontFamily,
    useFontSize,
    usePaddingBase
} from '@inkline/config';

const ns = 'kbd';

export function useKbdVariables(options = defaultDefinitionOptions) {
    const { colorDark } = useBrandColors();
    const { contrastTextColorDark } = useContrastTextColor();
    const { fontSizeSm } = useFontSize();
    const { fontFamilyMonospace } = useFontFamily();
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
        borderRadius
    } = useBorderRadiusBase();
    const { padding } = usePaddingBase();

    const kbdBackground = nsvariable(ns, 'background', ref(colorDark), options);

    const kbdBorderTopLeftRadius = namespace(ns, borderTopLeftRadius, options);
    const kbdBorderTopRightRadius = namespace(ns, borderTopRightRadius, options);
    const kbdBorderBottomRightRadius = namespace(ns, borderBottomRightRadius, options);
    const kbdBorderBottomLeftRadius = namespace(ns, borderBottomLeftRadius, options);
    const kbdBorderRadius = namespace(ns, borderRadius, options);

    const kbdColor = nsvariable(ns, 'color', ref(contrastTextColorDark), options);

    const kbdFontFamily = nsvariable(ns, 'font-family', ref(fontFamilyMonospace), options);
    const kbdFontSize = nsvariable(ns, 'font-size', ref(fontSizeSm), options);

    const kbdPaddingTop = nsvariable(ns, 'padding-top', '0.1875rem', options);
    const kbdPaddingRight = nsvariable(ns, 'padding-right', '0.375rem', options);
    const kbdPaddingBottom = nsvariable(ns, 'padding-bottom', '0.1875rem', options);
    const kbdPaddingLeft = nsvariable(ns, 'padding-left', '0.375rem', options);
    const kbdPadding = namespace(ns, padding, options);

    return {
        kbdBackground,
        kbdBorderTopLeftRadius,
        kbdBorderTopRightRadius,
        kbdBorderBottomRightRadius,
        kbdBorderBottomLeftRadius,
        kbdBorderRadius,
        kbdColor,
        kbdFontFamily,
        kbdFontSize,
        kbdPaddingTop,
        kbdPaddingRight,
        kbdPaddingBottom,
        kbdPaddingLeft,
        kbdPadding
    };
}

export function useKbdThemeBase() {
    const { kbdFontSize, kbdFontFamily, kbdPadding, kbdColor, kbdBackground, kbdBorderRadius } =
        useKbdVariables();

    selector('kbd', {
        fontSize: ref(kbdFontSize),
        fontFamily: ref(kbdFontFamily),
        padding: ref(kbdPadding),
        color: ref(kbdColor),
        backgroundColor: ref(kbdBackground),
        borderRadius: ref(kbdBorderRadius),
        display: 'inline-block'
    });

    selector('kbd > kbd', {
        padding: 0
    });
}

export function useKbdTheme() {
    useKbdVariables();
    useKbdThemeBase();
}
