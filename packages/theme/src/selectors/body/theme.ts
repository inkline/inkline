import {
    defaultDefinitionOptions,
    namespace,
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

    const bodyColor = namespace(ns, textColor, options);

    const bodyBackground = nsvariable(ns, "background", ref(colorWhite), options);
    nsvariable(ns, "background", ref(colorDark), {
        ...options,
        theme: darkThemeName
    });

    const bodyFontSize = namespace(ns, fontSize, options);
    const bodyFontFamily = nsvariable(ns, "font-family", ref(fontFamilyBase), options);

    const bodyLineHeight = namespace(ns, lineHeight, options);
    const bodyTextAlign = nsvariable(ns, "text-align", ref(textAlignLeft), options);

    const bodyTransitionProperty = namespace(ns, transitionProperty, options);
    const bodyTransitionDuration = namespace(ns, transitionDuration, options);
    const bodyTransitionTimingFunction = namespace(ns, transitionTimingFunction, options);
    const bodyTransition = namespace(ns, transition, options);

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
