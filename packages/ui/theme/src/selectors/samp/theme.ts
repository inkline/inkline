import { DefinitionOptions, nsvariables, ref, selector } from '@inkline/core';
import { useFontFamily } from '../../variables';

const ns = 'samp';

export function useSampConfig(options: DefinitionOptions) {
    const { fontFamilyMonospace } = useFontFamily(options);

    return {
        fontFamily: ref(fontFamilyMonospace)
    };
}

export function useSampVariables(options: DefinitionOptions) {
    return nsvariables(ns, useSampConfig(options), options);
}

export function useSampThemeSelectors(options: DefinitionOptions) {
    const { sampFontFamily } = useSampVariables(options);

    selector('samp', {
        fontFamily: ref(sampFontFamily)
    }, options);
}

export function useSampTheme(options: DefinitionOptions) {
    useSampVariables(options);
    useSampThemeSelectors(options);
}
