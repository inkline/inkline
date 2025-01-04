import {
    defaultDefinitionOptions,
    ref,
    selector, nsvariables, vref
} from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'ul';


export function useUlConfig() {
    const { spacing, spacingXl } = useSpacing();

    return {
        margin: {
            bottom: ref(spacing)
        },
        padding: {
            left: ref(spacingXl)
        }
    };
}

export function useUlVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useUlConfig(), options);
}

export function useUlThemeSelectors() {
    const { ulMargin, ulPadding } = useUlVariables();

    selector('ul', {
        margin: vref(ulMargin),
        padding: vref(ulPadding)
    });

    selector('ul ol, ul ul', {
        marginBottom: 0
    });
}

export function useUlTheme() {
    useUlVariables();
    useUlThemeSelectors();
}
