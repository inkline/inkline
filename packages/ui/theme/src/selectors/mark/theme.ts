import {
    DefinitionOptions,
    ref,
    selector,
    multiply,
    vref, nsvariables
} from '@inkline/core';
import { useBaseColors, useSpacing } from '../../variables';

const ns = 'mark';

export function useMarkConfig(options: DefinitionOptions) {
    const { colorYellowH, colorYellowS, colorYellowL, colorYellowA } = useBaseColors(options);
    const { spacing } = useSpacing(options);

    return {
        background: {
            h: ref(colorYellowH),
            s: ref(colorYellowS),
            l: ref(colorYellowL),
            a: ref(colorYellowA)
        },
        padding: {
            top: multiply(ref(spacing), 0.1875),
            right: multiply(ref(spacing), 0.375),
            bottom: multiply(ref(spacing), 0.1875),
            left: multiply(ref(spacing), 0.375)
        }
    };
}

export function useMarkVariables(options: DefinitionOptions) {
    return nsvariables(ns, useMarkConfig(options), options);
}

export function useMarkThemeSelectors(options: DefinitionOptions) {
    const { markPadding, markBackground } = useMarkVariables(options);

    selector('mark', {
        padding: vref(markPadding),
        background: vref(markBackground)
    }, options);
}

export function useMarkTheme(options: DefinitionOptions) {
    useMarkVariables(options);
    useMarkThemeSelectors(options);
}
