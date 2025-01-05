import {
    ref,
    selector,
    defaultDefinitionOptions,
    nsvariables,
    multiply,
    stripExportsNamespace
} from '@inkline/core';
import { capitalize } from '@inkline/utils';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useBrandColorVariants,
    useFontSize,
    useKeyMappedSizeMultiplier,
    useTransition,
    useColors,
    useContrastTextColor,
    useNeutralColors,
    useSpacing
} from '@inkline/theme';

const ns = 'modal';

const defaultModalColor = 'light';
const defaultModalColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultModalSize = 'md';
const defaultModalSizes = ['sm', 'md', 'lg'] as const;

type ModalColorVariant = (typeof defaultModalColors)[number];
type ModalSizeVariant = (typeof defaultModalSizes)[number];

export function useModalThemeVariables(options: DefinitionOptions) {
    const {
        borderTopStyle,
        borderTopWidth,
        borderRightStyle,
        borderRightWidth,
        borderBottomStyle,
        borderBottomWidth,
        borderLeftStyle,
        borderLeftWidth
    } = useBorder(options);
    const { colorLightShade50 } = useBrandColorVariants(options);
    const { spacing } = useSpacing(options);
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius
    } = useBorderRadius(options);
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow(options);
    const { colorWhiteH, colorWhiteS, colorWhiteL, colorWhiteA } = useNeutralColors(options);
    const { contrastTextColorLight } = useContrastTextColor(options);
    const { fontSize } = useFontSize(options);
    const { transitionProperty, transitionDuration, transitionTimingFunction } =
        useTransition(options);

    return {
        ...nsvariables(
            ns,
            {
                border: {
                    top: {
                        width: ref(borderTopWidth),
                        style: ref(borderTopStyle),
                        color: ref(colorLightShade50)
                    },
                    right: {
                        width: ref(borderRightWidth),
                        style: ref(borderRightStyle),
                        color: ref(colorLightShade50)
                    },
                    bottom: {
                        width: ref(borderBottomWidth),
                        style: ref(borderBottomStyle),
                        color: ref(colorLightShade50)
                    },
                    left: {
                        width: ref(borderLeftWidth),
                        style: ref(borderLeftStyle),
                        color: ref(colorLightShade50)
                    }
                },
                borderRadius: {
                    topLeft: ref(borderTopLeftRadius),
                    topRight: ref(borderTopRightRadius),
                    bottomRight: ref(borderBottomRightRadius),
                    bottomLeft: ref(borderBottomLeftRadius)
                },
                boxShadow: {
                    offsetX: ref(boxShadowOffsetX),
                    offsetY: ref(boxShadowOffsetY),
                    blurRadius: ref(boxShadowBlurRadius),
                    spreadRadius: ref(boxShadowSpreadRadius),
                    color: ref(boxShadowColor)
                },
                background: {
                    h: ref(colorWhiteH),
                    s: ref(colorWhiteS),
                    l: ref(colorWhiteL),
                    a: ref(colorWhiteA)
                },
                color: ref(contrastTextColorLight),
                fontSize: ref(fontSize),
                padding: {
                    top: ref(spacing),
                    right: ref(spacing),
                    bottom: ref(spacing),
                    left: ref(spacing)
                },
                transition: {
                    property: ref(transitionProperty),
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                },
                maxWidth: '480px',
                width: '100%',
                zIndex: 2000
            },
            options
        ),
        ...nsvariables(
            [ns, 'wrapper'] as const,
            {
                background: 'rgba(0, 0, 0, 0.75)'
            },
            options
        ),
        ...nsvariables(
            [ns, 'icon'] as const,
            {
                margin: {
                    top: '0',
                    right: ref(spacing),
                    bottom: '0',
                    left: '0'
                }
            },
            options
        ),
        ...nsvariables(
            [ns, 'close'] as const,
            {
                size: '1.5rem',
                fontSize: multiply(ref(fontSize), 0.5),
                color: ref(contrastTextColorLight),
                hover: {
                    background: 'rgba(0, 0, 0, 0.1)'
                },
                active: {
                    background: 'rgba(0, 0, 0, 0.15)'
                }
            },
            options
        ),
        ...nsvariables(
            [ns, 'header'] as const,
            {
                background: ref(colorLightShade50),
                color: ref(contrastTextColorLight)
            },
            options
        ),
        ...nsvariables(
            [ns, 'footer'] as const,
            {
                background: ref(colorLightShade50),
                color: ref(contrastTextColorLight)
            },
            options
        ),
        ...nsvariables(
            [ns, 'footer', 'button'] as const,
            {
                margin: {
                    left: multiply(ref(spacing), 0.5)
                }
            },
            options
        )
    };
}

export function useModalThemeLayout(options: DefinitionOptions) {
    const { modalZIndex } = useModalThemeVariables(options);

    selector('.modal-wrapper', {
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: ref(modalZIndex),
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    selector(
        [
            '.modal-wrapper.-alert > .modal > .modal-footer',
            '.modal-wrapper.-confirm > .modal > .modal-footer',
            '.modal-wrapper.-prompt > .modal > .modal-footer'
        ],
        {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    );

    selector('.modal', {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '0',
        wordWrap: 'break-word',
        backgroundClip: 'border-box',
        textAlign: 'left'
    });

    selector('.modal > .modal-header', {
        display: 'flex',
        justifyContent: 'space-between'
    });

    selector('.modal > .modal-body', {
        display: 'flex',
        flexDirection: 'row'
    });

    selector('.modal > .modal-footer', {
        display: 'flex',
        justifyContent: 'flex-end'
    });

    selector('.modal .modal-content', {
        width: '100%',
        display: 'block'
    });

    selector('.modal .modal-close', {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '1.5rem',
        width: '1.5rem',
        lineHeight: '1.5rem',
        fontSize: '0.5rem',
        cursor: 'pointer',
        padding: '0',
        border: '0',
        transition: 'background-color 0.3s ease',
        backgroundColor: 'transparent'
    });
}

export function useModalThemeBase(options: DefinitionOptions) {
    const {
        modalBorderStyle,
        modalBorderColor,
        modalBorderWidth,
        modalPadding,
        modalBorderTopLeftRadius,
        modalBorderTopRightRadius,
        modalBorderBottomLeftRadius,
        modalBorderBottomRightRadius,
        modalBoxShadow,
        modalBackground,
        modalColor,
        modalFontSize,
        modalTransitionProperty,
        modalTransitionDuration,
        modalTransitionTimingFunction,
        modalWrapperBackground,
        modalMaxWidth,
        modalWidth,
        modalHeaderBackground,
        modalHeaderColor,
        modalFooterBackground,
        modalFooterColor,
        modalFooterButtonMargin,
        modalIconMargin
    } = useModalThemeVariables(options);

    selector('.modal-wrapper', {
        background: ref(modalWrapperBackground)
    });

    selector('.modal', {
        maxWidth: ref(modalMaxWidth),
        width: ref(modalWidth),
        boxShadow: ref(modalBoxShadow),
        color: ref(modalColor),
        fontSize: ref(modalFontSize)
    });

    selector('.modal-header', {
        background: ref(modalHeaderBackground),
        color: ref(modalHeaderColor),
        borderStyle: ref(modalBorderStyle),
        borderColor: ref(modalBorderColor),
        borderWidth: ref(modalBorderWidth),
        padding: ref(modalPadding),
        transitionProperty: ref(modalTransitionProperty),
        transitionDuration: ref(modalTransitionDuration),
        transitionTimingFunction: ref(modalTransitionTimingFunction)
    });

    selector('.modal-body', {
        background: ref(modalBackground),
        borderStyle: ref(modalBorderStyle),
        borderColor: ref(modalBorderColor),
        borderWidth: ref(modalBorderWidth),
        color: ref(modalColor),
        padding: ref(modalPadding),
        transitionProperty: ref(modalTransitionProperty),
        transitionDuration: ref(modalTransitionDuration),
        transitionTimingFunction: ref(modalTransitionTimingFunction)
    });

    selector('.modal-footer', {
        background: ref(modalFooterBackground),
        color: ref(modalFooterColor),
        borderStyle: ref(modalBorderStyle),
        borderColor: ref(modalBorderColor),
        borderWidth: ref(modalBorderWidth),
        padding: ref(modalPadding),
        transitionProperty: ref(modalTransitionProperty),
        transitionDuration: ref(modalTransitionDuration),
        transitionTimingFunction: ref(modalTransitionTimingFunction)
    });

    selector('.modal-header + .modal-body', {
        borderTop: '0'
    });

    selector('.modal-body:has(+ .modal-footer)', {
        borderBottom: '0'
    });

    selector('.modal > *:first-child', {
        borderTopLeftRadius: ref(modalBorderTopLeftRadius),
        borderTopRightRadius: ref(modalBorderTopRightRadius)
    });

    selector('.modal > *:last-child', {
        borderBottomRightRadius: ref(modalBorderBottomRightRadius),
        borderBottomLeftRadius: ref(modalBorderBottomLeftRadius)
    });

    selector('.modal .modal-close', {
        color: ref(modalColor)
    });

    selector('.modal .modal-icon', {
        margin: ref(modalIconMargin),
        alignItems: 'center',
        display: 'flex'
    });

    selector('.modal-wrapper .modal-footer .button + .button', {
        margin: ref(modalFooterButtonMargin)
    });
}

export function useModalThemeSizeFactory(variant: ModalSizeVariant) {
    const {
        modalPaddingTop,
        modalPaddingRight,
        modalPaddingBottom,
        modalPaddingLeft,
        modalBorderTopLeftRadius,
        modalBorderTopRightRadius,
        modalBorderBottomRightRadius,
        modalBorderBottomLeftRadius,
        modalFontSize,
        modalMaxWidth
    } = useModalThemeVariables(options);
    const sizeMultiplierKeyMap = useKeyMappedSizeMultiplier(options);
    const sizeMultiplierRef = ref(sizeMultiplierKeyMap[variant]);
    const sizeNs = [ns, variant] as const;

    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
        fontSize,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        maxWidth
    } = stripExportsNamespace(
        nsvariables(sizeNs, {
            padding: {
                top: multiply(ref(modalPaddingTop), sizeMultiplierRef),
                right: multiply(ref(modalPaddingRight), sizeMultiplierRef),
                bottom: multiply(ref(modalPaddingBottom), sizeMultiplierRef),
                left: multiply(ref(modalPaddingLeft), sizeMultiplierRef)
            },
            borderRadius: {
                topLeft: multiply(ref(modalBorderTopLeftRadius), sizeMultiplierRef),
                topRight: multiply(ref(modalBorderTopRightRadius), sizeMultiplierRef),
                bottomRight: multiply(ref(modalBorderBottomRightRadius), sizeMultiplierRef),
                bottomLeft: multiply(ref(modalBorderBottomLeftRadius), sizeMultiplierRef)
            },
            maxWidth: multiply(ref(modalMaxWidth), sizeMultiplierRef),
            fontSize: multiply(ref(modalFontSize), sizeMultiplierRef)
        })
    );

    selector(`.modal.-${variant}`, {
        fontSize: ref(fontSize),
        maxWidth: ref(maxWidth)
    });

    selector(
        [
            `.modal.-${variant} .modal-header`,
            `.modal.-${variant} .modal-body`,
            `.modal.-${variant} .modal-footer`
        ],
        {
            paddingTop: ref(paddingTop),
            paddingRight: ref(paddingRight),
            paddingBottom: ref(paddingBottom),
            paddingLeft: ref(paddingLeft)
        }
    );

    selector(`.modal.-${variant} > *:first-child`, {
        borderTopLeftRadius: ref(borderTopLeftRadius),
        borderTopRightRadius: ref(borderTopRightRadius)
    });

    selector(`.modal.-${variant} > *:last-child`, {
        borderBottomRightRadius: ref(borderBottomRightRadius),
        borderBottomLeftRadius: ref(borderBottomLeftRadius)
    });
}

export function useModalThemeSizes(sizes = defaultModalSizes) {
    sizes.forEach((size) => useModalThemeSizeFactory(size, options));
}

export function useModalThemeColorFactory(variant: ModalColorVariant) {
    const colorKey = capitalize(variant);
    const shadeOrTint = variant === 'dark' ? 'Tint' : 'Shade';
    const colorNs = [ns, variant] as const;

    const colors = useColors(options);
    const contrastTextColors = useContrastTextColor(options);

    const { borderColor, background, color } = stripExportsNamespace(
        nsvariables(colorNs, {
            borderColor: ref(colors[`color${colorKey}${shadeOrTint}50`]),
            background: ref(variant === 'light' ? colors.colorWhite : colors[`color${colorKey}`]),
            color: ref(contrastTextColors[`contrastTextColor${colorKey}`])
        })
    );

    selector(
        [
            `.modal.-${variant} .modal-header`,
            `.modal.-${variant} .modal-body`,
            `.modal.-${variant} .modal-footer`,
            `.modal.-${variant} .modal-close`
        ],
        {
            borderColor: ref(borderColor),
            background: ref(background),
            color: ref(color)
        }
    );
}

export function useModalThemeColors(colors = defaultModalColors) {
    colors.forEach((color) => useModalThemeColorFactory(color, options));
}

export function useModalThemeVariants(options: DefinitionOptions) {
    selector('.modal.-fullscreen', {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column'
    });

    selector(
        [
            '.modal.-fullscreen > .modal-header',
            '.modal.-fullscreen > .modal-body',
            '.modal.-fullscreen > .modal-footer'
        ],
        {
            borderRadius: '0'
        }
    );

    selector('.modal.-fullscreen > .modal-body', {
        flex: '1',
        overflow: 'auto'
    });
}

export function useModalTheme(options: DefinitionOptions) {
    useModalThemeVariables(options);
    useModalThemeLayout(options);
    useModalThemeBase(options);
    useModalThemeSizes(options);
    useModalThemeColors(options);
    useModalThemeVariants(options);
}
