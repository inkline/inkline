import { DefinitionOptions, ref, selector, nsvariables, vref, defaultDefinitionOptions } from '@inkline/core';
import { useBorder, useSpacing } from '../../variables';

const ns = 'hr';

export function useHrThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);
    const { borderTopWidth, borderTopStyle, borderTopColor } = useBorder(options);

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

export function useHrThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useHrThemeConfig(options), options);
}

export function useHrThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        hrBorderTopColor,
        hrBorderRightColor,
        hrBorderBottomColor,
        hrBorderLeftColor,
        hrBorderStyle,
        hrBorderWidth,
        hrMargin
    } = useHrThemeVariables(options);

    selector('hr', {
        borderTopColor: ref(hrBorderTopColor),
        borderRightColor: ref(hrBorderRightColor),
        borderBottomColor: ref(hrBorderBottomColor),
        borderLeftColor: ref(hrBorderLeftColor),
        borderStyle: vref(hrBorderStyle),
        borderWidth: vref(hrBorderWidth),
        margin: vref(hrMargin)
    }, options);
}

export function useHrTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useHrThemeVariables(options);
    useHrThemeSelectors(options);
}
