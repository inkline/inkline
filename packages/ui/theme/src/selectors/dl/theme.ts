import {
    defaultDefinitionOptions,
    ref,
    selector, nsvariables, vref
} from '@inkline/core';
import { useFontWeight, useSpacing } from '../../variables';

const ns = 'dl';

export function useDlConfig() {
    const { spacing, spacingXs } = useSpacing();
    const { fontWeightBold } = useFontWeight();

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


export function useDlVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useDlConfig(), options);
}

export function useDlThemeSelectors() {
    const { dlMarginBottom, dlDtFontWeight, dlDdMarginBottom } = useDlVariables();

    selector('dl', {
        margin: vref(dlMarginBottom)
    });

    selector('dl dt', {
        fontWeight: ref(dlDtFontWeight)
    });

    selector('dl dd', {
        margin: vref(dlDdMarginBottom)
    });
}

export function useDlTheme() {
    useDlVariables();
    useDlThemeSelectors();
}
