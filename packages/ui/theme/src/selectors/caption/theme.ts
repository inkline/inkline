import {
    defaultDefinitionOptions,
    ref,
    selector,
    nsvariables,
    vref
} from '@inkline/core';
import { useSpacing, useTextColor } from '../../variables';

const ns = 'caption';


export function useCaptionThemeConfig() {
    const {
        textColorWeakerH,
        textColorWeakerS,
        textColorWeakerL,
        textColorWeakerA
    } = useTextColor();
    const { spacing } = useSpacing();

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

export function useCaptionThemeVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useCaptionThemeConfig(), options);
}

export function useCaptionThemeSelectors() {
    const { captionColor, captionPadding } = useCaptionThemeVariables();

    selector('caption', {
        textAlign: 'left',
        padding: vref(captionPadding),
        color: vref(captionColor)
    });
}

export function useCaptionTheme() {
    useCaptionThemeVariables();
    useCaptionThemeSelectors();
}
