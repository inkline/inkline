import { defaultDefinitionOptions, DefinitionOptions, ref, variable } from '@inkline/core';

export function useFontWeightVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const fontWeightExtralight = variable('font-weight-extralight', 200, options);
    const fontWeightLight = variable('font-weight-light', 300, options);
    const fontWeightNormal = variable('font-weight-normal', 'normal', options);
    const fontWeightMedium = variable('font-weight-medium', 500, options);
    const fontWeightSemibold = variable('font-weight-semibold', 600, options);
    const fontWeightBold = variable('font-weight-bold', 'bold', options);
    const fontWeightBlack = variable('font-weight-black', 900, options);
    const fontWeightLighter = variable('font-weight-lighter', 'lighter', options);
    const fontWeightBolder = variable('font-weight-bolder', 'bolder', options);

    const fontWeight = variable('font-weight', ref(fontWeightNormal), options);

    const fontWeightMap = {
        extralight: fontWeightExtralight,
        light: fontWeightLight,
        normal: fontWeightNormal,
        medium: fontWeightMedium,
        semibold: fontWeightSemibold,
        bold: fontWeightBold,
        black: fontWeightBlack,
        lighter: fontWeightLighter,
        bolder: fontWeightBolder,
        default: fontWeight
    };

    return {
        fontWeightExtralight,
        fontWeightLight,
        fontWeightNormal,
        fontWeightMedium,
        fontWeightSemibold,
        fontWeightBold,
        fontWeightBlack,
        fontWeightLighter,
        fontWeightBolder,
        fontWeight,
        fontWeightMap
    };
}

export function useFontWeight(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useFontWeightVariables(options);
}
