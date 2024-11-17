import {
    defaultDefinitionOptions,
    multiply,
    addVariableNamespace,
    nsvariable,
    ref,
    selector
} from '@inkline/core';
import { useMarginBase, usePaddingBase } from '../../variables';

const ns = 'ol';

export function useOlVariables(options = defaultDefinitionOptions) {
    const { marginBottom } = useMarginBase();
    const { paddingLeft } = usePaddingBase();

    const olMarginBottom = addVariableNamespace(ns, marginBottom, options);
    const olPaddingLeft = nsvariable(ns, 'padding-left', multiply(ref(paddingLeft), 2), options);

    return {
        olMarginBottom,
        olPaddingLeft
    };
}

export function useOlThemeBase() {
    const { olMarginBottom, olPaddingLeft } = useOlVariables();

    selector('ol', {
        marginBottom: ref(olMarginBottom),
        paddingLeft: ref(olPaddingLeft)
    });

    selector('ol ul, ol ol', {
        marginBottom: 0
    });
}

export function useOlTheme() {
    useOlVariables();
    useOlThemeBase();
}
