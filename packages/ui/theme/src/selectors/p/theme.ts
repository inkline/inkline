import {
    defaultDefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref
} from '@inkline/core';
import { useFontSize, useFontWeight, useSpacing } from '../../variables';

export function useParagraphConfig() {
    const { spacing } = useSpacing();

    return {
        margin: {
            top: 0,
            right: 0,
            bottom: ref(spacing),
            left: 0
        }
    };
}

export function useParagraphThemeVariables(options = defaultDefinitionOptions) {
    return nsvariables('p', useParagraphConfig(), options);
}

export function useLeadConfig() {
    const { fontSizeLg } = useFontSize();
    const { fontWeightLight } = useFontWeight();

    return {
        fontSize: ref(fontSizeLg),
        fontWeight: ref(fontWeightLight)
    };
}

export function useLeadVariables(options = defaultDefinitionOptions) {
    return nsvariables('lead', useLeadConfig(), options);
}

export function useInitialismConfig() {
    return {
        fontSize: '90%',
        textTransform: 'uppercase'
    };
}

export function useInitialismVariables(options = defaultDefinitionOptions) {
    return nsvariables('initialism', useInitialismConfig(), options);
}

export function useParagraphThemeSelectors() {
    const {
        pMargin
    } = useParagraphThemeVariables();

    selector('p', {
        margin: vref(pMargin)
    });
}

export function useLeadThemeSelectors() {
    const { leadFontSize, leadFontWeight } = useLeadVariables();

    selector('.lead', {
        fontSize: ref(leadFontSize),
        fontWeight: ref(leadFontWeight)
    });
}

export function useInitialismThemeSelectors() {
    const { initialismFontSize, initialismTextTransform } = useInitialismVariables();

    selector('.initialism', {
        fontSize: ref(initialismFontSize),
        textTransform: ref(initialismTextTransform)
    });
}


export function useParagraphTheme() {
    useParagraphThemeSelectors();
    useLeadThemeSelectors();
    useInitialismThemeSelectors();
}
