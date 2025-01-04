import { defaultDefinitionOptions, ref, selector, nsvariables, vref } from '@inkline/core';
import { useFontSize, useSpacing } from '../../variables';

const ns = 'legend';

export function useLegendThemeConfig() {
    const { spacing } = useSpacing();
    const { fontSizeLg } = useFontSize();

    return {
        margin: {
            bottom: ref(spacing)
        },
        fontSize: ref(fontSizeLg)
    };
}

export function useLegendThemeVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useLegendThemeConfig(), options);
}

export function useLegendThemeSelectors() {
    const { legendMargin, legendFontSize } = useLegendThemeVariables();

    // By using `float: left`, the legend will behave like a block element.
    // This way the border of a fieldset wraps around the legend if present.
    // Fix wrapping bug.
    // See https://github.com/twbs/bootstrap/issues/29712
    selector('legend', {
        float: 'left',
        width: '100%',
        padding: 0,
        margin: vref(legendMargin),
        fontSize: ref(legendFontSize),
        lineHeight: 'inherit'
    });

    // Fix wrapping bug.
    selector('legend + *', {
        clear: 'left'
    });
}

export function useLegendTheme() {
    useLegendThemeVariables();
    useLegendThemeSelectors();
}
