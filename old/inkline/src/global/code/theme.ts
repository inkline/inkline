import {
    defaultDefinitionOptions,
    nsvariable,
    ref,
    selector,
    useBaseColors,
    useFontFamily,
    useFontSize
} from '@inkline/config';

const ns = 'code';

export function useCodeVariables(options = defaultDefinitionOptions) {
    const { colorPink } = useBaseColors();
    const { fontSizeSm } = useFontSize();
    const { fontFamilyMonospace } = useFontFamily();

    const codeColor = nsvariable(ns, 'color', ref(colorPink), options);
    const codeFontSize = nsvariable(ns, 'font-size', ref(fontSizeSm), options);
    const codeFontFamily = nsvariable(ns, 'font-family', ref(fontFamilyMonospace), options);

    return {
        codeColor,
        codeFontSize,
        codeFontFamily
    };
}

export function useCodeThemeBase() {
    const { codeColor, codeFontSize, codeFontFamily } = useCodeVariables();

    selector('code', {
        color: ref(codeColor),
        fontSize: ref(codeFontSize),
        fontFamily: ref(codeFontFamily),
        wordWrap: 'break-word'
    });

    selector('a > code', {
        color: 'inherit'
    });
}

export function useCodeTheme() {
    useCodeVariables();
    useCodeThemeBase();
}
