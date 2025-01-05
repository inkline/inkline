import {
    DefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref
} from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'ol';

export function useOlConfig(options: DefinitionOptions) {
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

export function useOlVariables(options: DefinitionOptions) {
    return nsvariables(ns, useOlConfig(options), options);
}

export function useOlThemeSelectors(options: DefinitionOptions) {
    const { olMargin, olPadding } = useOlVariables(options);

    selector('ol', {
        margin: vref(olMargin),
        padding: vref(olPadding)
    }, options);

    selector('ol ul, ol ol', {
        marginBottom: 0
    }, options);
}

export function useOlTheme(options: DefinitionOptions) {
    useOlVariables(options);
    useOlThemeSelectors(options);
}
