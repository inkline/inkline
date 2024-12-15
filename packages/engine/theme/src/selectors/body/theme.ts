import {
    defaultDefinitionOptions,
    darkThemeName,
    ref,
    selector,
    nsvariables
} from '@inkline/core';
import {
    useBrandColorVariants,
    useFontFamily,
    useFontSize,
    useLineHeight,
    useNeutralColors,
    useTextAlign,
    useTextColor,
    useTransition
} from '../../variables';

const ns = 'body';

export function useBodyThemeVariables(options = defaultDefinitionOptions) {
    const { textColor } = useTextColor();
    const { colorWhite } = useNeutralColors();
    const { colorDarkShade50 } = useBrandColorVariants();
    const { fontSize } = useFontSize();
    const { fontFamilyBase } = useFontFamily();
    const { textAlignLeft } = useTextAlign();
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition();
    const { lineHeight } = useLineHeight();

    nsvariables(ns, {
        background: ref(colorDarkShade50)
    }, {
        ...options,
        theme: darkThemeName
    });

    return nsvariables(ns, {
        color: ref(textColor),
        background: ref(colorWhite),
        fontSize: ref(fontSize),
        fontFamily: ref(fontFamilyBase),
        lineHeight: ref(lineHeight),
        textAlign: ref(textAlignLeft),
        transition: {
            property: ref(transitionProperty),
            duration: ref(transitionDuration),
            timingFunction: ref(transitionTimingFunction)
        }
    }, options);
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

    selector('body', {
        color: ref(bodyColor),
        backgroundColor: ref(bodyBackground),
        fontSize: ref(bodyFontSize),
        fontFamily: ref(bodyFontFamily),
        lineHeight: ref(bodyLineHeight),
        textAlign: ref(bodyTextAlign),
        transition: ref(bodyTransition),
        textSizeAdjust: '100%'
    });
}

export function useBodyTheme() {
    useBodyThemeVariables();
    useBodyThemeBase();
}
