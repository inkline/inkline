import { defaultDefinitionOptions, ref, selector, nsvariables, vref } from '@inkline/core';
import { useBorder, useSpacing } from '../../variables';

const ns = 'hr';

export function useHrThemeConfig() {
    const { spacing } = useSpacing();
    const { borderTopWidth, borderTopStyle, borderTopColor } = useBorder();

    return {
        border: {
            top: {
                width: ref(borderTopWidth),
                style: ref(borderTopStyle),
                color: ref(borderTopColor)
            }
        },
        margin: {
            top: ref(spacing),
            right: 0,
            bottom: ref(spacing),
            left: 0
        }
    };
}

export function useHrThemeVariables(options = defaultDefinitionOptions) {
    return nsvariables(ns, useHrThemeConfig(), options);
}

export function useHrThemeSelectors() {
    const {
        hrBorderTopColor,
        hrBorderRightColor,
        hrBorderBottomColor,
        hrBorderLeftColor,
        hrBorderStyle,
        hrBorderWidth,
        hrMargin
    } = useHrThemeVariables();

    selector('hr', {
        borderTopColor: ref(hrBorderTopColor),
        borderRightColor: ref(hrBorderRightColor),
        borderBottomColor: ref(hrBorderBottomColor),
        borderLeftColor: ref(hrBorderLeftColor),
        borderStyle: vref(hrBorderStyle),
        borderWidth: vref(hrBorderWidth),
        margin: vref(hrMargin)
    });
}

export function useHrTheme() {
    useHrThemeVariables();
    useHrThemeSelectors();
}
