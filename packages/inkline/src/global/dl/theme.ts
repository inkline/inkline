import {
    defaultDefinitionOptions,
    multiply,
    namespace,
    nsvariable,
    ref,
    selector,
    useFontWeight,
    useMarginBase,
    usePaddingBase
} from '@inkline/config';

const ns = 'dl';

export function useDlVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { fontWeightBold } = useFontWeight();

    const dlMarginBottom = namespace(ns, marginBottom, options);

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
