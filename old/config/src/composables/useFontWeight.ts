import { ref, variable } from '../tokens';
import { defaultDefinitionOptions } from '../constants';

export function useFontWeight(options = defaultDefinitionOptions) {
    const fontWeightExtralight = variable('font-weight-extralight', 200, options);
    const fontWeightLight = variable('font-weight-light', 300, options);
    const fontWeightNormal = variable('font-weight-normal', 'normal', options);
    const fontWeightSemibold = variable('font-weight-semibold', 600, options);
    const fontWeightBold = variable('font-weight-bold', 'bold', options);
    const fontWeightBlack = variable('font-weight-black', 900, options);
    const fontWeightLighter = variable('font-weight-lighter', 'lighter', options);
    const fontWeightBolder = variable('font-weight-bolder', 'bolder', options);

    const fontWeight = variable('font-weight', ref(fontWeightNormal), options);

    return {
        fontWeightExtralight,
        fontWeightLight,
        fontWeightNormal,
        fontWeightSemibold,
        fontWeightBold,
        fontWeightBlack,
        fontWeightLighter,
        fontWeightBolder,
        fontWeight
    };
}
