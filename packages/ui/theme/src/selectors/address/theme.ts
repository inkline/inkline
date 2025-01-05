import { ref, selector, nsvariables, vref, DefinitionOptions } from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'address';

export function useAddressThemeConfig(options: DefinitionOptions) {
    const { spacing } = useSpacing(options);

    return {
        margin: {
            bottom: ref(spacing)
        }
    };
}

export function useAddressThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useAddressThemeConfig(options), options);
}

export function useAddressThemeSelectors(options: DefinitionOptions) {
    const { addressMargin } = useAddressThemeVariables(options);

    selector('address', {
        margin: vref(addressMargin),
        fontStyle: 'normal',
        lineHeight: 'inherit'
    }, options);
}

export function useAddressTheme(options: DefinitionOptions) {
    useAddressThemeVariables(options);
    useAddressThemeSelectors(options);
}
