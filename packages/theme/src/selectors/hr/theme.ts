import { defaultDefinitionOptions, addVariableNamespace, nsvariable, ref, selector } from '@inkline/core';
import { useBorder, useMarginBase } from '../../variables';

const ns = 'hr';

export function useHrThemeVariables(options = defaultDefinitionOptions) {
    const { marginTop, marginBottom, margin } = useMarginBase();
    const { borderTopWidth, borderTopStyle, borderTopColor, borderTop } = useBorder();

    const hrBorderTopWidth = addVariableNamespace(ns, borderTopWidth, options);
    const hrBorderTopStyle = addVariableNamespace(ns, borderTopStyle, options);
    const hrBorderTopColor = addVariableNamespace(ns, borderTopColor, options);
    const hrBorderTop = addVariableNamespace(ns, borderTop, options);

    const hrMarginTop = addVariableNamespace(ns, marginTop, options);
    const hrMarginRight = nsvariable(ns, 'margin-right', 0, options);
    const hrMarginBottom = addVariableNamespace(ns, marginBottom, options);
    const hrMarginLeft = nsvariable(ns, 'margin-left', 0, options);
    const hrMargin = addVariableNamespace(ns, margin, options);

    return {
        hrBorderTopWidth,
        hrBorderTopStyle,
        hrBorderTopColor,
        hrBorderTop,
        hrMarginTop,
        hrMarginRight,
        hrMarginBottom,
        hrMarginLeft,
        hrMargin
    };
}

export function useHrThemeBase() {
    const { hrBorderTop, hrMargin } = useHrThemeVariables();

    selector('hr', {
        borderTop: ref(hrBorderTop),
        borderRight: 0,
        borderBottom: 0,
        borderLeft: 0,
        margin: ref(hrMargin)
    });
}

export function useHrTheme() {
    useHrThemeVariables();
    useHrThemeBase();
}
