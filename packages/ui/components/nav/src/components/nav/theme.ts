import {
    multiply,
    ref,
    selector,
    nsvariables,
    add,
    setExportsNamespace,
    toVariableKey,
    vref,
    DefinitionOptions,
    hsla,
    css,
    defaultDefinitionOptions
} from '@inkline/core';
import { merge } from '@inkline/utils';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useFontSize,
    useTransition,
    useTextColor,
    useBrandColors,
    useBrandColorVariants,
    useNeutralColors,
    useContrastTextColor,
    useSpacing
} from '@inkline/theme';

const ns = 'nav';

const defaultNavColor = 'light';
const defaultNavColors = ['light', 'dark'] as const;

const defaultNavSize = 'md';
const defaultNavSizes = ['sm', 'md', 'lg'] as const;

type NavColorVariant = (typeof defaultNavColors)[number];
type NavSizeVariant = (typeof defaultNavSizes)[number];

const checkmarkIconUrl =
    'data:image/svg+xml; utf8, <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>check</title><path d="M23.625 3.5l-13.125 13.125-6.125-6.125-4.375 4.375 10.5 10.5 17.5-17.5z"></path></svg>';
const minusIconUrl =
    'data:image/svg+xml; utf8, <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>minus</title><path d="M0 11.375v5.25c0 0.483 0.392 0.875 0.875 0.875h26.25c0.483 0 0.875-0.392 0.875-0.875v-5.25c0-0.483-0.392-0.875-0.875-0.875h-26.25c-0.483 0-0.875 0.392-0.875 0.875z"></path></svg>';

export function useNavThemeColorConfig(variant: NavColorVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorDark } = useBrandColors(options);
    const {
        colorDarkTint50,
        colorLightShade50,
        colorPrimary300,
        colorPrimary400,
        colorPrimary500,
        colorPrimary600,
        colorPrimary700,
        colorPrimary800
    } = useBrandColorVariants(options);
    const { colorWhite, colorGray100, colorGray200, colorGray600, colorGray700 } =
        useNeutralColors(options);

    const { contrastTextColorLight, contrastTextColorDark } = useContrastTextColor(options);

    return {
        /**
         * @variant light
         */
        light: {
            border: {
                color: ref(colorLightShade50)
            },
            background: ref(colorWhite),
            color: ref(contrastTextColorLight),
            /**
             * @state disabled
             */
            disabled: {
                background: ref(colorGray100),
                border: {
                    color: ref(colorGray200)
                }
            },
            /**
             * @state readonly
             */
            readonly: {
                background: ref(colorGray100),
                border: {
                    color: ref(colorGray200)
                }
            },
            /**
             * @state checked
             */
            checked: {
                /**
                 * @state checked disabled
                 */
                disabled: {
                    background: ref(colorPrimary300),
                    border: {
                        color: ref(colorPrimary400)
                    }
                },
                /**
                 * @state checked readonly
                 */
                readonly: {
                    background: ref(colorPrimary400),
                    border: {
                        color: ref(colorPrimary500)
                    }
                }
            }
        },
        /**
         * @variant dark
         */
        dark: {
            border: {
                color: ref(colorDarkTint50)
            },
            background: ref(colorDark),
            color: ref(contrastTextColorDark),
            /**
             * @state disabled
             */
            disabled: {
                background: ref(colorGray600),
                border: {
                    color: ref(colorGray700)
                }
            },
            /**
             * @state readonly
             */
            readonly: {
                background: ref(colorGray600),
                border: {
                    color: ref(colorGray700)
                }
            },
            /**
             * @state checked
             */
            checked: {
                /**
                 * @state checked disabled
                 */
                disabled: {
                    background: ref(colorPrimary700),
                    border: {
                        color: ref(colorPrimary800)
                    }
                },
                /**
                 * @state checked readonly
                 */
                readonly: {
                    background: ref(colorPrimary600),
                    border: {
                        color: ref(colorPrimary700)
                    }
                }
            }
        }
    }[variant];
}

export function useNavThemeSizeConfig(variant: NavSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        borderTopLeftRadiusSm,
        borderTopRightRadiusSm,
        borderBottomRightRadiusSm,
        borderBottomLeftRadiusSm,
        borderTopLeftRadiusMd,
        borderTopRightRadiusMd,
        borderBottomRightRadiusMd,
        borderBottomLeftRadiusMd,
        borderTopLeftRadiusLg,
        borderTopRightRadiusLg,
        borderBottomRightRadiusLg,
        borderBottomLeftRadiusLg
    } = useBorderRadius(options);
    const { fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(options);
    const { spacingSm, spacingMd, spacingLg } = useSpacing(options);

    return {
        sm: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusSm),
                topRight: ref(borderTopRightRadiusSm),
                bottomRight: ref(borderBottomRightRadiusSm),
                bottomLeft: ref(borderBottomLeftRadiusSm)
            },
            fontSize: ref(fontSizeSm),
            margin: {
                top: 0,
                right: multiply(ref(spacingSm), 0.5),
                bottom: multiply(ref(spacingSm), 0.5),
                left: 0
            },
            width: ref(spacingSm),
            height: ref(spacingSm),
            /**
             * @element checkmark
             */
            checkmark: {
                width: multiply(ref(spacingSm), 0.5),
                height: multiply(ref(spacingSm), 0.5)
            }
        },
        md: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusMd),
                topRight: ref(borderTopRightRadiusMd),
                bottomRight: ref(borderBottomRightRadiusMd),
                bottomLeft: ref(borderBottomLeftRadiusMd)
            },
            fontSize: ref(fontSizeMd),
            margin: {
                top: 0,
                right: multiply(ref(spacingMd), 0.5),
                bottom: multiply(ref(spacingMd), 0.5),
                left: 0
            },
            width: ref(spacingMd),
            height: ref(spacingMd),
            /**
             * @element checkmark
             */
            checkmark: {
                width: multiply(ref(spacingMd), 0.5),
                height: multiply(ref(spacingMd), 0.5)
            }
        },
        lg: {
            borderRadius: {
                topLeft: ref(borderTopLeftRadiusLg),
                topRight: ref(borderTopRightRadiusLg),
                bottomRight: ref(borderBottomRightRadiusLg),
                bottomLeft: ref(borderBottomLeftRadiusLg)
            },
            fontSize: ref(fontSizeLg),
            margin: {
                top: 0,
                right: multiply(ref(spacingLg), 0.5),
                bottom: multiply(ref(spacingLg), 0.5),
                left: 0
            },
            width: ref(spacingLg),
            height: ref(spacingLg),
            /**
             * @element checkmark
             */
            checkmark: {
                width: multiply(ref(spacingLg), 0.5),
                height: multiply(ref(spacingLg), 0.5)
            }
        }
    }[variant];
}

export function useNavThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { colorPrimary } = useBrandColors(options);
    const { colorPrimaryShade50 } = useBrandColorVariants(options);
    const { colorWhite } = useNeutralColors(options);
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
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow(options);
    const { textColorWeak } = useTextColor(options);
    const { transitionDuration, transitionTimingFunction } = useTransition(options);

    return merge(
        {
            border: {
                top: {
                    width: ref(borderTopWidth),
                    style: ref(borderTopStyle)
                },
                right: {
                    width: ref(borderRightWidth),
                    style: ref(borderRightStyle)
                },
                bottom: {
                    width: ref(borderBottomWidth),
                    style: ref(borderBottomStyle)
                },
                left: {
                    width: ref(borderLeftWidth),
                    style: ref(borderLeftStyle)
                }
            },
            boxShadow: {
                offsetX: ref(boxShadowOffsetX),
                offsetY: ref(boxShadowOffsetY),
                blurRadius: ref(boxShadowBlurRadius),
                spreadRadius: ref(boxShadowSpreadRadius),
                color: ref(boxShadowColor)
            },
            transition: {
                property: 'background-color, color, border-color, transform',
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            },
            /**
             * @element checkmark
             */
            checkmark: {
                color: ref(colorWhite)
            },
            /**
             * @state disabled
             */
            disabled: {
                color: ref(textColorWeak)
            },
            /**
             * @state readonly
             */
            readonly: {
                color: ref(textColorWeak)
            },
            /**
             * @state checked
             */
            checked: {
                background: ref(colorPrimary),
                border: {
                    color: ref(colorPrimaryShade50)
                }
            },
            focus: {
                boxShadow: {
                    offsetX: ref(boxShadowOffsetX),
                    offsetY: ref(boxShadowOffsetY),
                    blurRadius: ref(boxShadowBlurRadius),
                    spreadRadius: ref(boxShadowSpreadRadius),
                    color: hsla(css`from ${ref(colorPrimary)} h s l / 0.25`)
                }
            }
        },
        useNavThemeColorConfig(defaultNavColor, options),
        useNavThemeSizeConfig(defaultNavSize, options)
    );
}

/**
 * Variables
 */

export function useNavThemeColorVariables(
    variant: NavColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useNavThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useNavThemeSizeVariables(variant: NavSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useNavThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useNavThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useNavThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useNavThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { navWidth, navHeight, navCheckmarkWidth, navCheckmarkHeight } =
        useNavThemeVariables(options);

    selector(
        '.nav',
        {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            outline: 0
        },
        options
    );

    selector(
        '.nav:last-of-type',
        {
            marginRight: 0
        },
        options
    );

    selector(
        '.nav .nav-label',
        {
            cursor: 'pointer',
            marginBottom: 0,
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative'
        },
        options
    );

    selector(
        ['.nav .nav-label::before', '.nav .nav-label::after'],
        {
            position: 'absolute',
            top: '50%',
            left: 0,
            display: 'inline-flex',
            cursor: 'pointer',
            width: ref(navWidth),
            height: ref(navHeight)
        },
        options
    );

    selector(
        '.nav .nav-label::before',
        {
            content: '""',
            userSelect: 'none',
            transform: 'translate(0, -50%)'
        },
        options
    );

    selector(
        '.nav input:indeterminate ~ .nav-label::after',
        {
            maskImage: `url('${minusIconUrl}')`
        },
        options
    );

    selector(
        '.nav .nav-label::after',
        {
            content: '""',
            zIndex: 1,
            textAlign: 'center',
            transform: 'scale(0) translate(0, -50%)',
            border: '1px solid transparent',
            transformOrigin: 'center top',
            maskImage: `url('${checkmarkIconUrl}')`,
            maskSize: [ref(navCheckmarkWidth), ref(navCheckmarkHeight)],
            maskPosition: 'center center',
            maskRepeat: 'no-repeat'
        },
        options
    );

    selector(
        '.nav input',
        {
            top: 0,
            left: 0,
            position: 'absolute',
            zIndex: 0,
            opacity: 0,
            height: 0,
            width: 0
        },
        options
    );

    selector(
        ['.nav .nav-label', '.nav input', '.nav input:focus', '.nav input:active'],
        {
            outline: 0
        },
        options
    );

    selector(
        ['.nav input:indeterminate ~ .nav-label::after', '.nav input:checked ~ .nav-label::after'],
        {
            content: '""',
            maskPosition: 'center center',
            maskRepeat: 'no-repeat',
            transform: 'scale(1) translate(0, -50%)'
        },
        options
    );

    selector(
        ['.nav input:disabled ~ .nav-label', '.nav input[readonly] ~ .nav-label'],
        {
            cursor: 'default'
        },
        options
    );

    selector(
        [
            '.nav input:disabled ~ .nav-label::after',
            '.nav input[readonly] ~ .nav-label::after',
            '.nav input:checked:disabled ~ .nav-label::after',
            '.nav input:checked[readonly] ~ .nav-label::after'
        ],
        {
            cursor: 'not-allowed'
        },
        options
    );
}

export function useNavThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        navBackground,
        navBorderTopColor,
        navBorderRightColor,
        navBorderBottomColor,
        navBorderLeftColor,
        navBorderStyle,
        navBorderWidth,
        navBorderRadius,
        navBoxShadow,
        navColor,
        navFontSize,
        navMargin,
        navMarginRight,
        navWidth,
        navTransitionDuration,
        navTransitionTimingFunction,
        navTransitionProperty,
        navCheckedBackground,
        navCheckedBorderTopColor,
        navCheckedBorderRightColor,
        navCheckedBorderBottomColor,
        navCheckedBorderLeftColor,
        navCheckedDisabledBackground,
        navCheckedDisabledBorderTopColor,
        navCheckedDisabledBorderRightColor,
        navCheckedDisabledBorderBottomColor,
        navCheckedDisabledBorderLeftColor,
        navCheckedReadonlyBackground,
        navCheckedReadonlyBorderTopColor,
        navCheckedReadonlyBorderRightColor,
        navCheckedReadonlyBorderBottomColor,
        navCheckedReadonlyBorderLeftColor,
        navDisabledColor,
        navDisabledBackground,
        navReadonlyBackground,
        navCheckmarkColor,
        navFocusBoxShadow
    } = useNavThemeVariables(options);

    selector(
        '.nav',
        {
            margin: vref(navMargin)
        },
        options
    );

    selector(
        '.nav .nav-label',
        {
            color: ref(navColor),
            fontSize: ref(navFontSize),
            paddingLeft: add(ref(navWidth), ref(navMarginRight)),
            transitionProperty: ref(navTransitionProperty),
            transitionDuration: ref(navTransitionDuration),
            transitionTimingFunction: ref(navTransitionTimingFunction)
        },
        options
    );

    selector(
        '.nav .nav-label::before',
        {
            background: ref(navBackground),
            borderTopColor: ref(navBorderTopColor),
            borderRightColor: ref(navBorderRightColor),
            borderBottomColor: ref(navBorderBottomColor),
            borderLeftColor: ref(navBorderLeftColor),
            borderWidth: vref(navBorderWidth),
            borderStyle: vref(navBorderStyle),
            borderRadius: vref(navBorderRadius),
            boxShadow: vref(navBoxShadow),
            transitionProperty: ref(navTransitionProperty),
            transitionDuration: ref(navTransitionDuration),
            transitionTimingFunction: ref(navTransitionTimingFunction)
        },
        options
    );

    selector(
        '.nav .nav-label::after',
        {
            background: ref(navCheckmarkColor),
            transitionProperty: ref(navTransitionProperty),
            transitionDuration: ref(navTransitionDuration),
            transitionTimingFunction: ref(navTransitionTimingFunction)
        },
        options
    );

    selector(
        '.nav:not(.-disabled) .nav-label:focus::before',
        {
            boxShadow: vref(navFocusBoxShadow)
        },
        options
    );

    selector(
        [
            '.nav input:checked ~ .nav-label::before',
            '.nav input:indeterminate ~ .nav-label::before'
        ],
        {
            background: ref(navCheckedBackground),
            borderTopColor: ref(navCheckedBorderTopColor),
            borderRightColor: ref(navCheckedBorderRightColor),
            borderBottomColor: ref(navCheckedBorderBottomColor),
            borderLeftColor: ref(navCheckedBorderLeftColor)
        },
        options
    );

    selector(
        '.nav input:disabled ~ .nav-label',
        {
            color: ref(navDisabledColor),
            cursor: 'default'
        },
        options
    );

    selector(
        ['.nav input:disabled ~ .nav-label::before'],
        {
            background: ref(navDisabledBackground),
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        ['.nav input[readonly] ~ .nav-label::before'],
        {
            background: ref(navReadonlyBackground),
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        '.nav input:checked:disabled ~ .nav-label::before',
        {
            background: ref(navCheckedDisabledBackground),
            borderTopColor: ref(navCheckedDisabledBorderTopColor),
            borderRightColor: ref(navCheckedDisabledBorderRightColor),
            borderBottomColor: ref(navCheckedDisabledBorderBottomColor),
            borderLeftColor: ref(navCheckedDisabledBorderLeftColor)
        },
        options
    );

    selector(
        '.nav input[readonly]:checked ~ .nav-label::before',
        {
            background: ref(navCheckedReadonlyBackground),
            borderTopColor: ref(navCheckedReadonlyBorderTopColor),
            borderRightColor: ref(navCheckedReadonlyBorderRightColor),
            borderBottomColor: ref(navCheckedReadonlyBorderBottomColor),
            borderLeftColor: ref(navCheckedReadonlyBorderLeftColor)
        },
        options
    );
}

export function useNavThemeSizeSelectors(variant: NavSizeVariant, userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        navBorderTopLeftRadius,
        navBorderTopRightRadius,
        navBorderBottomRightRadius,
        navBorderBottomLeftRadius,
        navFontSize,
        navWidth,
        navHeight,
        navMarginTop,
        navMarginRight,
        navMarginBottom,
        navMarginLeft,
        navCheckmarkWidth,
        navCheckmarkHeight
    } = useNavThemeVariables(options);

    const {
        variantBorderTopLeftRadius,
        variantBorderTopRightRadius,
        variantBorderBottomRightRadius,
        variantBorderBottomLeftRadius,
        variantFontSize,
        variantWidth,
        variantHeight,
        variantMarginTop,
        variantMarginRight,
        variantMarginBottom,
        variantMarginLeft,
        variantCheckmarkWidth,
        variantCheckmarkHeight
    } = setExportsNamespace(useNavThemeSizeVariables(variant, options), 'variant');

    selector(
        `.nav.-${variant}`,
        {
            [toVariableKey(navBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(navBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(navBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(navBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(navFontSize)]: ref(variantFontSize),
            [toVariableKey(navMarginTop)]: ref(variantMarginTop),
            [toVariableKey(navMarginRight)]: ref(variantMarginRight),
            [toVariableKey(navMarginBottom)]: ref(variantMarginBottom),
            [toVariableKey(navMarginLeft)]: ref(variantMarginLeft),
            [toVariableKey(navWidth)]: ref(variantWidth),
            [toVariableKey(navHeight)]: ref(variantHeight),
            [toVariableKey(navCheckmarkWidth)]: ref(variantCheckmarkWidth),
            [toVariableKey(navCheckmarkHeight)]: ref(variantCheckmarkHeight)
        },
        options
    );
}

/**
 * @TODO MIGRATE THIS
 */
export function useNavThemeColorSelectors(
    variant: NavColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        navColor,
        navBackground,
        navBorderTopColor,
        navBorderRightColor,
        navBorderBottomColor,
        navBorderLeftColor,
        navDisabledBackground,
        navDisabledBorderTopColor,
        navDisabledBorderRightColor,
        navDisabledBorderBottomColor,
        navDisabledBorderLeftColor,
        navReadonlyBackground,
        navReadonlyBorderTopColor,
        navReadonlyBorderRightColor,
        navReadonlyBorderBottomColor,
        navReadonlyBorderLeftColor,
        navCheckedDisabledBackground,
        navCheckedDisabledBorderTopColor,
        navCheckedDisabledBorderRightColor,
        navCheckedDisabledBorderBottomColor,
        navCheckedDisabledBorderLeftColor,
        navCheckedReadonlyBackground,
        navCheckedReadonlyBorderTopColor,
        navCheckedReadonlyBorderRightColor,
        navCheckedReadonlyBorderBottomColor,
        navCheckedReadonlyBorderLeftColor
    } = useNavThemeVariables(options);
    const {
        variantBackground,
        variantBorderTopColor,
        variantBorderRightColor,
        variantBorderBottomColor,
        variantBorderLeftColor,
        variantColor,
        variantDisabledBackground,
        variantDisabledBorderTopColor,
        variantDisabledBorderRightColor,
        variantDisabledBorderBottomColor,
        variantDisabledBorderLeftColor,
        variantReadonlyBackground,
        variantReadonlyBorderTopColor,
        variantReadonlyBorderRightColor,
        variantReadonlyBorderBottomColor,
        variantReadonlyBorderLeftColor,
        variantCheckedDisabledBackground,
        variantCheckedDisabledBorderTopColor,
        variantCheckedDisabledBorderRightColor,
        variantCheckedDisabledBorderBottomColor,
        variantCheckedDisabledBorderLeftColor,
        variantCheckedReadonlyBackground,
        variantCheckedReadonlyBorderTopColor,
        variantCheckedReadonlyBorderRightColor,
        variantCheckedReadonlyBorderBottomColor,
        variantCheckedReadonlyBorderLeftColor
    } = setExportsNamespace(useNavThemeColorVariables(variant, options), 'variant');

    selector(
        `.nav.-${variant}`,
        {
            [toVariableKey(navBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(navBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(navBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(navBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(navBackground)]: ref(variantBackground),
            [toVariableKey(navColor)]: ref(variantColor),
            [toVariableKey(navDisabledBackground)]: ref(variantDisabledBackground),
            [toVariableKey(navDisabledBorderTopColor)]: ref(variantDisabledBorderTopColor),
            [toVariableKey(navDisabledBorderRightColor)]: ref(variantDisabledBorderRightColor),
            [toVariableKey(navDisabledBorderBottomColor)]: ref(variantDisabledBorderBottomColor),
            [toVariableKey(navDisabledBorderLeftColor)]: ref(variantDisabledBorderLeftColor),
            [toVariableKey(navReadonlyBackground)]: ref(variantReadonlyBackground),
            [toVariableKey(navReadonlyBorderTopColor)]: ref(variantReadonlyBorderTopColor),
            [toVariableKey(navReadonlyBorderRightColor)]: ref(variantReadonlyBorderRightColor),
            [toVariableKey(navReadonlyBorderBottomColor)]: ref(variantReadonlyBorderBottomColor),
            [toVariableKey(navReadonlyBorderLeftColor)]: ref(variantReadonlyBorderLeftColor),
            [toVariableKey(navCheckedDisabledBackground)]: ref(variantCheckedDisabledBackground),
            [toVariableKey(navCheckedDisabledBorderTopColor)]: ref(
                variantCheckedDisabledBorderTopColor
            ),
            [toVariableKey(navCheckedDisabledBorderRightColor)]: ref(
                variantCheckedDisabledBorderRightColor
            ),
            [toVariableKey(navCheckedDisabledBorderBottomColor)]: ref(
                variantCheckedDisabledBorderBottomColor
            ),
            [toVariableKey(navCheckedDisabledBorderLeftColor)]: ref(
                variantCheckedDisabledBorderLeftColor
            ),
            [toVariableKey(navCheckedReadonlyBackground)]: ref(variantCheckedReadonlyBackground),
            [toVariableKey(navCheckedReadonlyBorderTopColor)]: ref(
                variantCheckedReadonlyBorderTopColor
            ),
            [toVariableKey(navCheckedReadonlyBorderRightColor)]: ref(
                variantCheckedReadonlyBorderRightColor
            ),
            [toVariableKey(navCheckedReadonlyBorderBottomColor)]: ref(
                variantCheckedReadonlyBorderBottomColor
            ),
            [toVariableKey(navCheckedReadonlyBorderLeftColor)]: ref(
                variantCheckedReadonlyBorderLeftColor
            )
        },
        options
    );
}

export function useNavThemeVariantsSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { navMarginRight } = useNavThemeVariables(options);

    selector(
        '.nav.-native input',
        {
            top: 'auto',
            left: 'auto',
            position: 'relative',
            opacity: 1,
            height: 'auto',
            width: 'auto'
        },
        options
    );

    selector(
        '.nav.-native .nav-label',
        {
            paddingLeft: ref(navMarginRight)
        },
        options
    );

    selector(
        ['.nav.-native .nav-label::before', '.nav.-native .nav-label::after'],
        {
            display: 'none'
        },
        options
    );
}

/**
 * Composables
 */

export function useNavThemeSizes(sizes: NavSizeVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useNavThemeSizeSelectors(size, options));
}

export function useNavThemeColors(colors: NavColorVariant[], userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useNavThemeColorSelectors(color, options));
}

export function useNavTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useNavThemeVariables(options);
    useNavThemeLayoutSelectors(options);
    useNavThemeBaseSelectors(options);
    useNavThemeSizes([...defaultNavSizes], options);
    useNavThemeColors([...defaultNavColors], options);
    useNavThemeVariantsSelectors(options);
}
