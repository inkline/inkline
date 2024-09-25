import {
    defaultDefinitionOptions,
    nsvariable,
    ref,
    selector,
    useFontFamily
} from '@inkline/config';

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
