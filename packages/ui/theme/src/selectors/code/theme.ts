import { defaultDefinitionOptions, DefinitionOptions, nsvariables, ref, selector, vref } from '@inkline/core';
import { useBaseColors, useFontFamily, useFontSize } from '../../variables';

const ns = 'code';

export function useCodeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorPink } = useBaseColors(options);
    const { fontSizeSm } = useFontSize(options);
    const { fontFamilyMonospace } = useFontFamily(options);

    return {
        color: ref(colorPink),
        fontSize: ref(fontSizeSm),
        fontFamily: ref(fontFamilyMonospace)
    };
}

export function useCodeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useCodeConfig(options), options);
}

export function useCodeThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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

export function useCodeTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useCodeVariables(options);
    useCodeThemeSelectors(options);
}
