import {
    DefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref, defaultDefinitionOptions
} from '@inkline/core';
import { useFontFamily, useFontSize, useSpacing } from '../../variables';

const ns = 'pre';

export function usePreConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeSm } = useFontSize(options);
    const { fontFamilyMonospace } = useFontFamily(options);
    const { spacing } = useSpacing(options);

    return {
        fontSize: ref(fontSizeSm),
        fontFamily: ref(fontFamilyMonospace),
        margin: {
            bottom: ref(spacing)
        }
    };
}

export function usePreVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, usePreConfig(options), options);
}

export function usePreThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { preMargin, preFontSize, preFontFamily } = usePreVariables(options);

    selector('pre', {
        fontSize: ref(preFontSize),
        fontFamily: ref(preFontFamily),
        margin: vref(preMargin),
        display: 'block',
        marginTop: 0,
        overflow: 'auto'
    }, options);

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
    }, options);
}

export function usePreTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    usePreVariables(options);
    usePreThemeSelectors(options);
}
