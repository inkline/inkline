import {
    defaultDefinitionOptions,
    namespace,
    nsvariable,
    ref,
    selector,
    useFontFamily,
    useFontSize,
    useMarginBase
} from '@inkline/config';

const ns = 'pre';

export function usePreVariables(options = defaultDefinitionOptions) {
    const { fontSizeSm } = useFontSize();
    const { fontFamilyMonospace } = useFontFamily();
    const { marginBottom } = useMarginBase();

    const preFontSize = nsvariable(ns, 'font-size', ref(fontSizeSm), options);
    const preFontFamily = nsvariable(ns, 'font-family', ref(fontFamilyMonospace), options);
    const preMarginBottom = namespace(ns, marginBottom, options);

    return {
        preFontSize,
        preFontFamily,
        preMarginBottom
    };
}

export function usePreThemeBase() {
    const { preMarginBottom, preFontSize, preFontFamily } = usePreVariables();

    selector('pre', {
        fontSize: ref(preFontSize),
        fontFamily: ref(preFontFamily),
        marginBottom: ref(preMarginBottom),
        display: 'block',
        marginTop: 0,
        overflow: 'auto'
    });

    /**
     * Account for some code outputs that place code tags in pre tags
     * @credit https://github.com/twbs/bootstrap
     */
    selector('pre > code', {
        fontSize: 'inherit',
        color: 'inherit',
        wordBreak: 'normal',
        background: 'transparent',
        padding: 0
    });
}

export function usePreTheme() {
    usePreVariables();
    usePreThemeBase();
}
