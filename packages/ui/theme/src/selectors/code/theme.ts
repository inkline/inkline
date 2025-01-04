import { defaultDefinitionOptions, nsvariables, ref, selector, vref } from '@inkline/core';
import { useBaseColors, useFontFamily, useFontSize } from '../../variables';

const ns = 'code';

export function useCodeConfig() {
    const { colorPinkH, colorPinkS, colorPinkL, colorPinkA } = useBaseColors();
    const { fontSizeSm } = useFontSize();
    const { fontFamilyMonospace } = useFontFamily();

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

export function useCodeVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useCodeConfig(), options);
}

export function useCodeThemeSelectors() {
    const { codeColor, codeFontSize, codeFontFamily } = useCodeVariables();

    selector('code', {
        color: vref(codeColor),
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
    useCodeThemeSelectors();
}
