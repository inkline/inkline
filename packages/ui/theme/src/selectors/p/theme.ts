import {
    DefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref
} from '@inkline/core';
import { useFontSize, useFontWeight, useSpacing } from '../../variables';

export function useParagraphConfig(options: DefinitionOptions) {
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

export function useParagraphThemeVariables(options: DefinitionOptions) {
    return nsvariables('p', useParagraphConfig(options), options);
}

export function useLeadConfig(options: DefinitionOptions) {
    const { fontSizeLg } = useFontSize(options);
    const { fontWeightLight } = useFontWeight(options);

    return {
        fontSize: ref(fontSizeLg),
        fontWeight: ref(fontWeightLight)
    };
}

export function useLeadVariables(options: DefinitionOptions) {
    return nsvariables('lead', useLeadConfig(options), options);
}

export function useInitialismConfig(_options: DefinitionOptions) {
    return {
        fontSize: '90%',
        textTransform: 'uppercase'
    };
}

export function useInitialismVariables(options: DefinitionOptions) {
    return nsvariables('initialism', useInitialismConfig(options), options);
}

export function useParagraphThemeSelectors(options: DefinitionOptions) {
    const {
        pMargin
    } = useParagraphThemeVariables(options);

    selector('p', {
        margin: vref(pMargin)
    }, options);
}

export function useLeadThemeSelectors(options: DefinitionOptions) {
    const { leadFontSize, leadFontWeight } = useLeadVariables(options);

    selector('.lead', {
        fontSize: ref(leadFontSize),
        fontWeight: ref(leadFontWeight)
    }, options);
}

export function useInitialismThemeSelectors(options: DefinitionOptions) {
    const { initialismFontSize, initialismTextTransform } = useInitialismVariables(options);

    selector('.initialism', {
        fontSize: ref(initialismFontSize),
        textTransform: ref(initialismTextTransform)
    }, options);
}


export function useParagraphTheme(options: DefinitionOptions) {
    useParagraphThemeSelectors(options);
    useLeadThemeSelectors(options);
    useInitialismThemeSelectors(options);
}
