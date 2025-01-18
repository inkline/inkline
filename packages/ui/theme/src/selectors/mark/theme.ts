import {
    DefinitionOptions,
    ref,
    selector,
    multiply,
    vref, nsvariables, defaultDefinitionOptions
} from '@inkline/core';
import { useBaseColors, useSpacing } from '../../variables';

const ns = 'mark';

export function useMarkConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorYellow } = useBaseColors(options);
    const { spacing } = useSpacing(options);

    return {
        background: ref(colorYellow),
        padding: {
            top: multiply(ref(spacing), 0.1875),
            right: multiply(ref(spacing), 0.375),
            bottom: multiply(ref(spacing), 0.1875),
            left: multiply(ref(spacing), 0.375)
        }
    };
}

export function useMarkVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useMarkConfig(options), options);
}

export function useMarkThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { markPadding, markBackground } = useMarkVariables(options);

    selector('mark', {
        padding: vref(markPadding),
        background: vref(markBackground)
    }, options);
}

export function useMarkTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useMarkVariables(options);
    useMarkThemeSelectors(options);
}
