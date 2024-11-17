import {
    defaultDefinitionOptions,
    addVariableNamespace,
    nsvariable,
    ref,
    selector,
    darkThemeName
} from "@inkline/core";
import {
    useBrandColors,
    useFontFamily,
    useFontSize,
    useLineHeight,
    useNeutralColors,
    useTextAlign,
    useTextColor,
    useTransition
} from "../../variables";

const ns = "body";

export function useBodyThemeVariables(options = defaultDefinitionOptions) {
    const { textColor } = useTextColor();
    const { colorWhite } = useNeutralColors();
    const { colorDark } = useBrandColors();
    const { fontSize } = useFontSize();
    const { fontFamilyBase } = useFontFamily();
    const { textAlignLeft } = useTextAlign();
    const { transitionProperty, transitionDuration, transitionTimingFunction, transition } =
        useTransition();
    const { lineHeight } = useLineHeight();

    const bodyColor = addVariableNamespace(ns, textColor, options);

    const bodyBackground = nsvariable(ns, "background", ref(colorWhite), options);
    nsvariable(ns, "background", ref(colorDark), {
        ...options,
        theme: darkThemeName
    });

    const bodyFontSize = addVariableNamespace(ns, fontSize, options);
    const bodyFontFamily = nsvariable(ns, "font-family", ref(fontFamilyBase), options);

    const bodyLineHeight = addVariableNamespace(ns, lineHeight, options);
    const bodyTextAlign = nsvariable(ns, "text-align", ref(textAlignLeft), options);

    const bodyTransitionProperty = addVariableNamespace(ns, transitionProperty, options);
    const bodyTransitionDuration = addVariableNamespace(ns, transitionDuration, options);
    const bodyTransitionTimingFunction = addVariableNamespace(ns, transitionTimingFunction, options);
    const bodyTransition = addVariableNamespace(ns, transition, options);

    return {
        bodyColor,
        bodyBackground,
        bodyFontSize,
        bodyFontFamily,
        bodyLineHeight,
        bodyTextAlign,
        bodyTransitionProperty,
        bodyTransitionDuration,
        bodyTransitionTimingFunction,
        bodyTransition
    };
}

export function useBodyThemeBase() {
    const {
        bodyColor,
        bodyBackground,
        bodyFontSize,
        bodyFontFamily,
        bodyLineHeight,
        bodyTextAlign,
        bodyTransition
    } = useBodyThemeVariables();

    selector("body", {
        color: ref(bodyColor),
        backgroundColor: ref(bodyBackground),
        fontSize: ref(bodyFontSize),
        fontFamily: ref(bodyFontFamily),
        lineHeight: ref(bodyLineHeight),
        textAlign: ref(bodyTextAlign),
        transition: ref(bodyTransition),
        textSizeAdjust: "100%"
    });
}

export function useBodyTheme() {
    useBodyThemeVariables();
    useBodyThemeBase();
}
