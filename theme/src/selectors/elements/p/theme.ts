import {
    DefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref, defaultDefinitionOptions
} from '@inkline/core';
import { useFontSize, useFontWeight, useSpacing } from '../../../variables';

const ns = 'p';

export function useParagraphConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);

    return {
        margin: {
            top: 0,
            right: 0,
            bottom: ref(spacing),
            left: 0
        }
    };
}

export function useParagraphThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useParagraphConfig(options), options);
}


export function useParagraphThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        pMargin
    } = useParagraphThemeVariables(options);

    selector('p', {
        margin: vref(pMargin)
    }, options);
}


export function useParagraphTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useParagraphThemeSelectors(options);
}
