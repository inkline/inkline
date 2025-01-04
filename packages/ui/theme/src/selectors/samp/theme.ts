import { defaultDefinitionOptions, nsvariables, ref, selector } from '@inkline/core';
import { useFontFamily } from '../../variables';

const ns = 'samp';

export function useSampConfig() {
    const { fontFamilyMonospace } = useFontFamily();

    return {
        fontFamily: ref(fontFamilyMonospace)
    };
}

export function useSampVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useSampConfig(), options);
}

export function useSampThemeSelectors() {
    const { sampFontFamily } = useSampVariables();

    selector('samp', {
        fontFamily: ref(sampFontFamily)
    });
}

export function useSampTheme() {
    useSampVariables();
    useSampThemeSelectors();
}
