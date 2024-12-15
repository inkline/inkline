import { defaultDefinitionOptions, nsvariable, ref, selector } from '@inkline/core';
import { useFontFamily } from '../../variables';

const ns = 'samp';

export function useSampVariables(options = defaultDefinitionOptions) {
    const { fontFamilyMonospace } = useFontFamily();

    const sampFontFamily = nsvariable(ns, 'font-family', ref(fontFamilyMonospace), options);

    return {
        sampFontFamily
    };
}

export function useSampThemeBase() {
    const { sampFontFamily } = useSampVariables();

    selector('samp', {
        fontFamily: ref(sampFontFamily)
    });
}

export function useSampTheme() {
    useSampVariables();
    useSampThemeBase();
}
