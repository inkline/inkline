import {
    DefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref, defaultDefinitionOptions
} from '@inkline/core';
import { useFontSize, useFontWeight, useSpacing } from '../../variables';

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

    return nsvariables('p', useParagraphConfig(options), options);
}

export function useLeadConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fontSizeLg } = useFontSize(options);
    const { fontWeightLight } = useFontWeight(options);

    return {
        fontSize: ref(fontSizeLg),
        fontWeight: ref(fontWeightLight)
    };
}

export function useLeadVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables('lead', useLeadConfig(options), options);
}

export function useInitialismConfig(_userOptions: DefinitionOptions) {
    return {
        fontSize: '90%',
        textTransform: 'uppercase'
    };
}

export function useInitialismVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables('initialism', useInitialismConfig(options), options);
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

export function useLeadThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { leadFontSize, leadFontWeight } = useLeadVariables(options);

    selector('.lead', {
        fontSize: ref(leadFontSize),
        fontWeight: ref(leadFontWeight)
    }, options);
}

export function useInitialismThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { initialismFontSize, initialismTextTransform } = useInitialismVariables(options);

    selector('.initialism', {
        fontSize: ref(initialismFontSize),
        textTransform: ref(initialismTextTransform)
    }, options);
}


export function useParagraphTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useParagraphThemeSelectors(options);
    useLeadThemeSelectors(options);
    useInitialismThemeSelectors(options);
}
