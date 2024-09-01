import {
    defaultDefinitionOptions,
    namespace,
    nsvariable,
    ref,
    selector,
    useFontSize,
    useFontWeight,
    useMarginBase
} from '@inkline/config';

export function useParagraphThemeVariables(options = defaultDefinitionOptions) {
    const { fontSizeLg } = useFontSize();
    const { fontWeightLight } = useFontWeight();
    const { marginBottom, margin } = useMarginBase();

    const paragraphMarginTop = nsvariable('p', 'margin-top', 0, options);
    const paragraphMarginRight = nsvariable('p', 'margin-right', 0, options);
    const paragraphMarginBottom = nsvariable('p', 'margin-bottom', ref(marginBottom), options);
    const paragraphMarginLeft = nsvariable('p', 'margin-left', 0, options);
    const paragraphMargin = namespace('p', margin, options);

    const leadFontSize = nsvariable('lead', 'font-size', ref(fontSizeLg), options);
    const leadFontWeight = nsvariable('lead', 'font-weight', ref(fontWeightLight), options);

    const initialismFontSize = nsvariable('initialism', 'font-size', '90%', options);
    const initialismTextTransform = nsvariable(
        'initialism',
        'text-transform',
        'uppercase',
        options
    );

    return {
        paragraphMarginTop,
        paragraphMarginRight,
        paragraphMarginBottom,
        paragraphMarginLeft,
        paragraphMargin,
        leadFontSize,
        leadFontWeight,
        initialismFontSize,
        initialismTextTransform
    };
}

export function useParagraphThemeBase() {
    const {
        paragraphMargin,
        leadFontSize,
        leadFontWeight,
        initialismFontSize,
        initialismTextTransform
    } = useParagraphThemeVariables();

    selector('p', {
        margin: ref(paragraphMargin)
    });

    selector('.lead', {
        fontSize: ref(leadFontSize),
        fontWeight: ref(leadFontWeight)
    });

    selector('.initialism', {
        fontSize: ref(initialismFontSize),
        textTransform: ref(initialismTextTransform)
    });
}

export function useParagraphTheme() {
    useParagraphThemeBase();
}
