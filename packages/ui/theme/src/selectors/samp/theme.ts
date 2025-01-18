import { defaultDefinitionOptions, DefinitionOptions, nsvariables, ref, selector } from '@inkline/core';
import { useFontFamily } from '../../variables';

const ns = 'samp';

export function useSampConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontFamilyMonospace } = useFontFamily(options);

    return {
        fontFamily: ref(fontFamilyMonospace)
    };
}

export function useSampVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useSampConfig(options), options);
}

export function useSampThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { sampFontFamily } = useSampVariables(options);

    selector('samp', {
        fontFamily: ref(sampFontFamily)
    }, options);
}

export function useSampTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useSampVariables(options);
    useSampThemeSelectors(options);
}
