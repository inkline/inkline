import {
    defaultDefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref
} from '@inkline/core';
import { useFontFamily, useFontSize, useSpacing } from '../../variables';

const ns = 'pre';

export function usePreConfig() {
    const { fontSizeSm } = useFontSize();
    const { fontFamilyMonospace } = useFontFamily();
    const { spacing } = useSpacing();

    return {
        fontSize: ref(fontSizeSm),
        fontFamily: ref(fontFamilyMonospace),
        margin: {
            bottom: ref(spacing)
        }
    };
}

export function usePreVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, usePreConfig(), options);
}

export function usePreThemeSelectors() {
    const { preMargin, preFontSize, preFontFamily } = usePreVariables();

    selector('pre', {
        fontSize: ref(preFontSize),
        fontFamily: ref(preFontFamily),
        margin: vref(preMargin),
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
    usePreThemeSelectors();
}
