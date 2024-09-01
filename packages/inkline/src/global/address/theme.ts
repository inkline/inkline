import { defaultDefinitionOptions, namespace, ref, selector, useMarginBase } from '@inkline/config';

const ns = 'address';

export function useAddressThemeVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();

    const addressMarginBottom = namespace(ns, marginBottom, options);

    return {
        addressMarginBottom
    };
}

export function useAddressThemeBase() {
    const { addressMarginBottom } = useAddressThemeVariables();

    selector('address', {
        marginBottom: ref(addressMarginBottom),
        fontStyle: 'normal',
        lineHeight: 'inherit'
    });
}

export function useAddressTheme() {
    useAddressThemeVariables();
    useAddressThemeBase();
}
