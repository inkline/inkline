import { ref, selector, nsvariables, vref, DefinitionOptions, defaultDefinitionOptions } from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'address';

export function useAddressThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);

    return {
        margin: {
            bottom: ref(spacing)
        }
    };
}

export function useAddressThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useAddressThemeConfig(options), options);
}

export function useAddressThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { addressMargin } = useAddressThemeVariables(options);

    selector('address', {
        margin: vref(addressMargin),
        fontStyle: 'normal',
        lineHeight: 'inherit'
    }, options);
}

export function useAddressTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useAddressThemeVariables(options);
    useAddressThemeSelectors(options);
}
