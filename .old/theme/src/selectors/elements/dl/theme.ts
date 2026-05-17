import {
    ref,
    selector, nsvariables, vref, DefinitionOptions, defaultDefinitionOptions
} from '@inkline/core';
import { useFontWeight, useSpacing } from '../../../variables';

const ns = 'dl';

export function useDlConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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


export function useDlVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useDlConfig(options), options);
}

export function useDlThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };


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

export function useDlTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useDlVariables(options);
    useDlThemeSelectors(options);


}
