import {
    defaultDefinitionOptions,
    ref,
    selector,
    multiply,
    vref, nsvariables
} from '@inkline/core';
import { useBaseColors, useSpacing } from '../../variables';

const ns = 'mark';

export function useMarkConfig() {
    const { colorYellowH, colorYellowS, colorYellowL, colorYellowA } = useBaseColors();
    const { spacing } = useSpacing();

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

export function useMarkVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useMarkConfig(), options);
}

export function useMarkThemeSelectors() {
    const { markPadding, markBackground } = useMarkVariables();

    selector('mark', {
        padding: vref(markPadding),
        background: vref(markBackground)
    });
}

export function useMarkTheme() {
    useMarkVariables();
    useMarkThemeSelectors();
}
