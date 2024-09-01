import {
    defaultDefinitionOptions,
    namespace,
    nsvariable,
    ref,
    selector,
    useBorder,
    useMarginBase
} from '@inkline/config';

const ns = 'hr';

export function useHrThemeVariables(options = defaultDefinitionOptions) {
    const { marginTop, marginBottom, margin } = useMarginBase();
    const { borderTopWidth, borderTopStyle, borderTopColor, borderTop } = useBorder();

    const hrBorderTopWidth = namespace(ns, borderTopWidth, options);
    const hrBorderTopStyle = namespace(ns, borderTopStyle, options);
    const hrBorderTopColor = namespace(ns, borderTopColor, options);
    const hrBorderTop = namespace(ns, borderTop, options);

    const hrMarginTop = namespace(ns, marginTop, options);
    const hrMarginRight = nsvariable(ns, 'margin-right', 0, options);
    const hrMarginBottom = namespace(ns, marginBottom, options);
    const hrMarginLeft = nsvariable(ns, 'margin-left', 0, options);
    const hrMargin = namespace(ns, margin, options);

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
