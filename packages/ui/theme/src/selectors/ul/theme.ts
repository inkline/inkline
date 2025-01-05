import {
    DefinitionOptions,
    ref,
    selector, nsvariables, vref
} from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'ul';


export function useUlConfig(options: DefinitionOptions) {
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

export function useUlVariables(options: DefinitionOptions) {
    return nsvariables(ns, useUlConfig(options), options);
}

export function useUlThemeSelectors(options: DefinitionOptions) {
    const { ulMargin, ulPadding } = useUlVariables(options);

    selector('ul', {
        margin: vref(ulMargin),
        padding: vref(ulPadding)
    }, options);

    selector('ul ol, ul ul', {
        marginBottom: 0
    }, options);
}

export function useUlTheme(options: DefinitionOptions) {
    useUlVariables(options);
    useUlThemeSelectors(options);
}
