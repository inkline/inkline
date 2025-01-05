import {
    ref,
    selector,
    nsvariables,
    vref, DefinitionOptions
} from '@inkline/core';
import { useSpacing, useTextColor } from '../../variables';

const ns = 'caption';

export function useCaptionThemeConfig(options: DefinitionOptions) {
    const {
        textColorWeakerH,
        textColorWeakerS,
        textColorWeakerL,
        textColorWeakerA
    } = useTextColor(options);
    const { spacing } = useSpacing(options);

    return {
        color: {
            h: ref(textColorWeakerH),
            s: ref(textColorWeakerS),
            l: ref(textColorWeakerL),
            a: ref(textColorWeakerA)
        },
        padding: {
            top: ref(spacing),
            right: 0,
            bottom: ref(spacing),
            left: 0
        }
    };
}

export function useCaptionThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useCaptionThemeConfig(options), options);
}

export function useCaptionThemeSelectors(options: DefinitionOptions) {
    const { captionColor, captionPadding } = useCaptionThemeVariables(options);

    selector('caption', {
        textAlign: 'left',
        padding: vref(captionPadding),
        color: vref(captionColor)
    }, options);
}

export function useCaptionTheme(options: DefinitionOptions) {
    useCaptionThemeVariables(options);
    useCaptionThemeSelectors(options);
}
