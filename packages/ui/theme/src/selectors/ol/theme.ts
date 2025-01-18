import {
    DefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref, defaultDefinitionOptions
} from '@inkline/core';
import { useSpacing } from '../../variables';

const ns = 'ol';

export function useOlConfig(userOptions: DefinitionOptions) {
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

export function useOlVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useOlConfig(options), options);
}

export function useOlThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { olMargin, olPadding } = useOlVariables(options);

    selector('ol', {
        margin: vref(olMargin),
        padding: vref(olPadding)
    }, options);

    selector('ol ul, ol ol', {
        marginBottom: 0
    }, options);
}

export function useOlTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useOlVariables(options);
    useOlThemeSelectors(options);
}
