import {
    ref,
    selector,
    nsvariables,
    vref, DefinitionOptions, defaultDefinitionOptions
} from '@inkline/core';
import { useSpacing, useTextColor } from '../../variables';

const ns = 'caption';

export function useCaptionThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        textColorWeaker
    } = useTextColor(options);
    const { spacing } = useSpacing(options);

    return {
        color: ref(textColorWeaker),
        padding: {
            top: ref(spacing),
            right: 0,
            bottom: ref(spacing),
            left: 0
        }
    };
}

export function useCaptionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useCaptionThemeConfig(options), options);
}

export function useCaptionThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { captionColor, captionPadding } = useCaptionThemeVariables(options);

    selector('caption', {
        textAlign: 'left',
        padding: vref(captionPadding),
        color: vref(captionColor)
    }, options);
}

export function useCaptionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useCaptionThemeVariables(options);
    useCaptionThemeSelectors(options);
}
