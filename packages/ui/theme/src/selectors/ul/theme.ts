import {
    DefinitionOptions,
    ref,
    selector, nsvariables, vref, defaultDefinitionOptions
} from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'ul';


export function useUlConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing, spacingXl } = useSpacing(options);

    return {
        margin: {
            bottom: ref(spacing)
        },
        padding: {
            left: ref(spacingXl)
        }
    };
}

export function useUlVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useUlConfig(options), options);
}

export function useUlThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { ulMargin, ulPadding } = useUlVariables(options);

    selector('ul', {
        margin: vref(ulMargin),
        padding: vref(ulPadding)
    }, options);

    selector('ul ol, ul ul', {
        marginBottom: 0
    }, options);
}

export function useUlTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useUlVariables(options);
    useUlThemeSelectors(options);
}
