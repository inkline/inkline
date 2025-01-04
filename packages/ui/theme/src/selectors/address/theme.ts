import { defaultDefinitionOptions, ref, selector, nsvariables, vref } from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'address';

export function useAddressThemeConfig() {
    const { spacing } = useSpacing();

    return {
        margin: {
            bottom: ref(spacing)
        }
    };
}

export function useAddressThemeVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useAddressThemeConfig(), options);
}

export function useAddressThemeSelectors() {
    const { addressMargin } = useAddressThemeVariables();

    selector('address', {
        margin: vref(addressMargin),
        fontStyle: 'normal',
        lineHeight: 'inherit'
    });
}

export function useAddressTheme() {
    useAddressThemeVariables();
    useAddressThemeSelectors();
}
