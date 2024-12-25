import {
    defaultDefinitionOptions,
    multiply,
    addVariableNamespace,
    nsvariable,
    ref,
    selector
} from '@inkline/core';
import { useFontWeight, useMarginBase } from '../../variables';

const ns = 'dl';

export function useDlVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { fontWeightBold } = useFontWeight();

    const dlMarginBottom = addVariableNamespace(ns, marginBottom, options);

    const dlDtFontWeight = nsvariable([ns, 'dt'], 'font-weight', ref(fontWeightBold), options);

    const dlDdMarginBottom = nsvariable(
        [ns, 'dd'],
        'margin-bottom',
        multiply(ref(marginBottom), 0.5),
        options
    );

    return {
        dlMarginBottom,
        dlDtFontWeight,
        dlDdMarginBottom
    };
}

export function useDlThemeBase() {
    const { dlMarginBottom, dlDtFontWeight, dlDdMarginBottom } = useDlVariables();

    selector('dl', {
        marginBottom: ref(dlMarginBottom)
    });

    selector('dl dt', {
        fontWeight: ref(dlDtFontWeight)
    });

    selector('dl dd', {
        marginBottom: ref(dlDdMarginBottom)
    });
}

export function useDlTheme() {
    useDlVariables();
    useDlThemeBase();
}
