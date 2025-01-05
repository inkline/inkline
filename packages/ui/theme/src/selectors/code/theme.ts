import { DefinitionOptions, nsvariables, ref, selector, vref } from '@inkline/core';
import { useBaseColors, useFontFamily, useFontSize } from '../../variables';

const ns = 'code';

export function useCodeConfig(options: DefinitionOptions) {
    const { colorPinkH, colorPinkS, colorPinkL, colorPinkA } = useBaseColors(options);
    const { fontSizeSm } = useFontSize(options);
    const { fontFamilyMonospace } = useFontFamily(options);

    return {
        color: {
            h: ref(colorPinkH),
            s: ref(colorPinkS),
            l: ref(colorPinkL),
            a: ref(colorPinkA)
        },
        fontSize: ref(fontSizeSm),
        fontFamily: ref(fontFamilyMonospace)
    };
}

export function useCodeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useCodeConfig(options), options);
}

export function useCodeThemeSelectors(options: DefinitionOptions) {
    const { codeColor, codeFontSize, codeFontFamily } = useCodeVariables(options);

    selector('code', {
        color: vref(codeColor),
        fontSize: ref(codeFontSize),
        fontFamily: ref(codeFontFamily),
        wordWrap: 'break-word'
    }, options);

    selector('a > code', {
        color: 'inherit'
    }, options);
}

export function useCodeTheme(options: DefinitionOptions) {
    useCodeVariables(options);
    useCodeThemeSelectors(options);
}
