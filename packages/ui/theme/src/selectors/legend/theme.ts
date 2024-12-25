import { defaultDefinitionOptions, addVariableNamespace, nsvariable, ref, selector } from '@inkline/core';
import { useFontSize, useMarginBase } from '../../variables';

const ns = 'legend';

export function useLegendThemeVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { fontSizeLg } = useFontSize();

    const legendMarginBottom = addVariableNamespace(ns, marginBottom, options);
    const legendFontSize = nsvariable(ns, 'font-size', ref(fontSizeLg), options);

    return {
        legendMarginBottom,
        legendFontSize
    };
}

export function useLegendThemeBase() {
    const { legendMarginBottom, legendFontSize } = useLegendThemeVariables();

    // By using `float: left`, the legend will behave like a block element.
    // This way the border of a fieldset wraps around the legend if present.
    // Fix wrapping bug.
    // See https://github.com/twbs/bootstrap/issues/29712
    selector('legend', {
        float: 'left',
        width: '100%',
        padding: 0,
        marginBottom: ref(legendMarginBottom),
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
    useLegendThemeBase();
}
