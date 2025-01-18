import { DefinitionOptions, ref, selector, nsvariables, vref, defaultDefinitionOptions } from '@inkline/core';
import { useFontSize, useSpacing } from '../../variables';

const ns = 'legend';

export function useLegendThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);
    const { fontSizeLg } = useFontSize(options);

    return {
        margin: {
            bottom: ref(spacing)
        },
        fontSize: ref(fontSizeLg)
    };
}

export function useLegendThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useLegendThemeConfig(options), options);
}

export function useLegendThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { legendMargin, legendFontSize } = useLegendThemeVariables(options);

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
    }, options);

    // Fix wrapping bug.
    selector('legend + *', {
        clear: 'left'
    }, options);
}

export function useLegendTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useLegendThemeVariables(options);
    useLegendThemeSelectors(options);
}
