import {
    defaultDefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref
} from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'ol';

export function useOlConfig() {
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

export function useOlVariables(options = defaultDefinitionOptions) {

    return nsvariables(ns, useOlConfig(), options);
}

export function useOlThemeSelectors() {
    const { olMargin, olPadding } = useOlVariables();

    selector('ol', {
        margin: vref(olMargin),
        padding: vref(olPadding)
    });

    selector('ol ul, ol ol', {
        marginBottom: 0
    });
}

export function useOlTheme() {
    useOlVariables();
    useOlThemeSelectors();
}
