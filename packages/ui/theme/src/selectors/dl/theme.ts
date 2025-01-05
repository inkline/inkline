import {
    ref,
    selector, nsvariables, vref, DefinitionOptions
} from '@inkline/core';
import { useFontWeight, useSpacing } from '../../variables';

const ns = 'dl';

export function useDlConfig(options: DefinitionOptions) {
    const { spacing, spacingXs } = useSpacing(options);
    const { fontWeightBold } = useFontWeight(options);

    return {
        margin: {
            bottom: ref(spacing)
        },
        /**
         * @element dt
         */
        dt: {
            fontWeight: ref(fontWeightBold)
        },
        /**
         * @element dd
         */
        dd: {
            margin: {
                bottom: ref(spacingXs)
            }
        }
    };
}


export function useDlVariables(options: DefinitionOptions) {
    return nsvariables(ns, useDlConfig(options), options);
}

export function useDlThemeSelectors(options: DefinitionOptions) {

    const { dlMarginBottom, dlDtFontWeight, dlDdMarginBottom } = useDlVariables(options);

    selector('dl', {
        margin: vref(dlMarginBottom)
    }, options);

    selector('dl dt', {
        fontWeight: ref(dlDtFontWeight)
    }, options);

    selector('dl dd', {
        margin: vref(dlDdMarginBottom)
    }, options);
}

export function useDlTheme(options: DefinitionOptions) {
    useDlVariables(options);
    useDlThemeSelectors(options);


}
