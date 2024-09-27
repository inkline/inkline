import { defaultDefinitionOptions, namespace, nsvariable, ref, selector } from '@inkline/core';
import { useBaseColors, usePaddingBase } from '../../variables';

const ns = 'mark';

export function useMarkVariables(options = defaultDefinitionOptions) {
    const { colorYellow } = useBaseColors();
    const { padding } = usePaddingBase();

    const markBackground = nsvariable(ns, 'background', ref(colorYellow), options);

    const markPaddingTop = nsvariable(ns, 'padding-top', '0.1875rem', options);
    const markPaddingRight = nsvariable(ns, 'padding-right', '0.1875rem', options);
    const markPaddingBottom = nsvariable(ns, 'padding-bottom', '0.1875rem', options);
    const markPaddingLeft = nsvariable(ns, 'padding-left', '0.1875rem', options);
    const markPadding = namespace(ns, padding, options);

    return {
        markBackground,
        markPaddingTop,
        markPaddingRight,
        markPaddingBottom,
        markPaddingLeft,
        markPadding
    };
}

export function useMarkThemeBase() {
    const { markPadding, markBackground } = useMarkVariables();

    selector('mark', {
        padding: ref(markPadding),
        backgroundColor: ref(markBackground)
    });
}

export function useMarkTheme() {
    useMarkVariables();
    useMarkThemeBase();
}
