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

const ns = 'checkbox';

const defaultCheckboxColor = 'light';
const defaultCheckboxColors = ['light', 'dark'] as const;

const defaultCheckboxSize = 'md';
const defaultCheckboxSizes = ['sm', 'md', 'lg'] as const;

type CheckboxColorVariant = (typeof defaultCheckboxColors)[number];
type CheckboxSizeVariant = (typeof defaultCheckboxSizes)[number];

const checkmarkIconUrl =
    'data:image/svg+xml; utf8, <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>check</title><path d="M23.625 3.5l-13.125 13.125-6.125-6.125-4.375 4.375 10.5 10.5 17.5-17.5z"></path></svg>';
const minusIconUrl =
    'data:image/svg+xml; utf8, <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>minus</title><path d="M0 11.375v5.25c0 0.483 0.392 0.875 0.875 0.875h26.25c0.483 0 0.875-0.392 0.875-0.875v-5.25c0-0.483-0.392-0.875-0.875-0.875h-26.25c-0.483 0-0.875 0.392-0.875 0.875z"></path></svg>';

export function useCheckboxThemeColorConfig(
    variant: CheckboxColorVariant,
    userOptions: DefinitionOptions
) {
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

export function useCheckboxThemeSizeConfig(
    variant: CheckboxSizeVariant,
    userOptions: DefinitionOptions
) {
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
    const { fontSizeXs, fontSizeSm, fontSizeMd } = useFontSize(options);
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
            fontSize: ref(fontSizeXs),
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

export function useCheckboxThemeConfig(userOptions: DefinitionOptions) {
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
        useCheckboxThemeColorConfig(defaultCheckboxColor, options),
        useCheckboxThemeSizeConfig(defaultCheckboxSize, options)
    );
}

/**
 * Variables
 */

export function useCheckboxThemeColorVariables(
    variant: CheckboxColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useCheckboxThemeColorConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useCheckboxThemeSizeVariables(
    variant: CheckboxSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables([ns, variant] as const, useCheckboxThemeSizeConfig(variant, options), {
        ...options,
        registerComposed: false
    });
}

export function useCheckboxThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useCheckboxThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useCheckboxThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { checkboxWidth, checkboxHeight, checkboxCheckmarkWidth, checkboxCheckmarkHeight } =
        useCheckboxThemeVariables(options);

    selector(
        '.checkbox',
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
        '.checkbox:last-of-type',
        {
            marginRight: 0
        },
        options
    );

    selector(
        '.checkbox .checkbox-label',
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
        ['.checkbox .checkbox-label::before', '.checkbox .checkbox-label::after'],
        {
            position: 'absolute',
            top: '50%',
            left: 0,
            display: 'inline-flex',
            cursor: 'pointer',
            width: ref(checkboxWidth),
            height: ref(checkboxHeight)
        },
        options
    );

    selector(
        '.checkbox .checkbox-label::before',
        {
            content: '""',
            userSelect: 'none',
            transform: 'translate(0, -50%)'
        },
        options
    );

    selector(
        '.checkbox input:indeterminate ~ .checkbox-label::after',
        {
            maskImage: `url('${minusIconUrl}')`
        },
        options
    );

    selector(
        '.checkbox .checkbox-label::after',
        {
            content: '""',
            zIndex: 1,
            textAlign: 'center',
            transform: 'scale(0) translate(0, -50%)',
            border: '1px solid transparent',
            transformOrigin: 'center top',
            maskImage: `url('${checkmarkIconUrl}')`,
            maskSize: [ref(checkboxCheckmarkWidth), ref(checkboxCheckmarkHeight)],
            maskPosition: 'center center',
            maskRepeat: 'no-repeat'
        },
        options
    );

    selector(
        '.checkbox input',
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
        [
            '.checkbox .checkbox-label',
            '.checkbox input',
            '.checkbox input:focus',
            '.checkbox input:active'
        ],
        {
            outline: 0
        },
        options
    );

    selector(
        [
            '.checkbox input:indeterminate ~ .checkbox-label::after',
            '.checkbox input:checked ~ .checkbox-label::after'
        ],
        {
            content: '""',
            maskPosition: 'center center',
            maskRepeat: 'no-repeat',
            transform: 'scale(1) translate(0, -50%)'
        },
        options
    );

    selector(
        [
            '.checkbox input:disabled ~ .checkbox-label',
            '.checkbox input[readonly] ~ .checkbox-label'
        ],
        {
            cursor: 'default'
        },
        options
    );

    selector(
        [
            '.checkbox input:disabled ~ .checkbox-label::after',
            '.checkbox input[readonly] ~ .checkbox-label::after',
            '.checkbox input:checked:disabled ~ .checkbox-label::after',
            '.checkbox input:checked[readonly] ~ .checkbox-label::after'
        ],
        {
            cursor: 'not-allowed'
        },
        options
    );
}

export function useCheckboxThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        checkboxBackground,
        checkboxBorderTopColor,
        checkboxBorderRightColor,
        checkboxBorderBottomColor,
        checkboxBorderLeftColor,
        checkboxBorderStyle,
        checkboxBorderWidth,
        checkboxBorderRadius,
        checkboxBoxShadow,
        checkboxColor,
        checkboxFontSize,
        checkboxMargin,
        checkboxMarginRight,
        checkboxWidth,
        checkboxTransitionDuration,
        checkboxTransitionTimingFunction,
        checkboxTransitionProperty,
        checkboxCheckedBackground,
        checkboxCheckedBorderTopColor,
        checkboxCheckedBorderRightColor,
        checkboxCheckedBorderBottomColor,
        checkboxCheckedBorderLeftColor,
        checkboxCheckedDisabledBackground,
        checkboxCheckedDisabledBorderTopColor,
        checkboxCheckedDisabledBorderRightColor,
        checkboxCheckedDisabledBorderBottomColor,
        checkboxCheckedDisabledBorderLeftColor,
        checkboxCheckedReadonlyBackground,
        checkboxCheckedReadonlyBorderTopColor,
        checkboxCheckedReadonlyBorderRightColor,
        checkboxCheckedReadonlyBorderBottomColor,
        checkboxCheckedReadonlyBorderLeftColor,
        checkboxDisabledColor,
        checkboxDisabledBackground,
        checkboxReadonlyBackground,
        checkboxCheckmarkColor,
        checkboxFocusBoxShadow
    } = useCheckboxThemeVariables(options);

    selector(
        '.checkbox',
        {
            margin: vref(checkboxMargin)
        },
        options
    );

    selector(
        '.checkbox .checkbox-label',
        {
            color: vref(checkboxColor),
            fontSize: ref(checkboxFontSize),
            paddingLeft: add(ref(checkboxWidth), ref(checkboxMarginRight)),
            transitionProperty: ref(checkboxTransitionProperty),
            transitionDuration: ref(checkboxTransitionDuration),
            transitionTimingFunction: ref(checkboxTransitionTimingFunction)
        },
        options
    );

    selector(
        '.checkbox .checkbox-label::before',
        {
            background: vref(checkboxBackground),
            borderTopColor: vref(checkboxBorderTopColor),
            borderRightColor: vref(checkboxBorderRightColor),
            borderBottomColor: vref(checkboxBorderBottomColor),
            borderLeftColor: vref(checkboxBorderLeftColor),
            borderWidth: vref(checkboxBorderWidth),
            borderStyle: vref(checkboxBorderStyle),
            borderRadius: vref(checkboxBorderRadius),
            boxShadow: vref(checkboxBoxShadow),
            transitionProperty: ref(checkboxTransitionProperty),
            transitionDuration: ref(checkboxTransitionDuration),
            transitionTimingFunction: ref(checkboxTransitionTimingFunction)
        },
        options
    );

    selector(
        '.checkbox .checkbox-label::after',
        {
            background: vref(checkboxCheckmarkColor),
            transitionProperty: ref(checkboxTransitionProperty),
            transitionDuration: ref(checkboxTransitionDuration),
            transitionTimingFunction: ref(checkboxTransitionTimingFunction)
        },
        options
    );

    selector(
        '.checkbox:not(.-disabled) .checkbox-label:focus::before',
        {
            boxShadow: vref(checkboxFocusBoxShadow)
        },
        options
    );

    selector(
        [
            '.checkbox input:checked ~ .checkbox-label::before',
            '.checkbox input:indeterminate ~ .checkbox-label::before'
        ],
        {
            background: vref(checkboxCheckedBackground),
            borderTopColor: ref(checkboxCheckedBorderTopColor),
            borderRightColor: ref(checkboxCheckedBorderRightColor),
            borderBottomColor: ref(checkboxCheckedBorderBottomColor),
            borderLeftColor: ref(checkboxCheckedBorderLeftColor)
        },
        options
    );

    selector(
        '.checkbox input:disabled ~ .checkbox-label',
        {
            color: vref(checkboxDisabledColor),
            cursor: 'default'
        },
        options
    );

    selector(
        ['.checkbox input:disabled ~ .checkbox-label::before'],
        {
            background: vref(checkboxDisabledBackground),
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        ['.checkbox input[readonly] ~ .checkbox-label::before'],
        {
            background: vref(checkboxReadonlyBackground),
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        '.checkbox input:checked:disabled ~ .checkbox-label::before',
        {
            background: vref(checkboxCheckedDisabledBackground),
            borderTopColor: ref(checkboxCheckedDisabledBorderTopColor),
            borderRightColor: ref(checkboxCheckedDisabledBorderRightColor),
            borderBottomColor: ref(checkboxCheckedDisabledBorderBottomColor),
            borderLeftColor: ref(checkboxCheckedDisabledBorderLeftColor)
        },
        options
    );

    selector(
        '.checkbox input[readonly]:checked ~ .checkbox-label::before',
        {
            background: vref(checkboxCheckedReadonlyBackground),
            borderTopColor: ref(checkboxCheckedReadonlyBorderTopColor),
            borderRightColor: ref(checkboxCheckedReadonlyBorderRightColor),
            borderBottomColor: ref(checkboxCheckedReadonlyBorderBottomColor),
            borderLeftColor: ref(checkboxCheckedReadonlyBorderLeftColor)
        },
        options
    );
}

export function useCheckboxThemeSizeSelectors(
    variant: CheckboxSizeVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        checkboxBorderTopLeftRadius,
        checkboxBorderTopRightRadius,
        checkboxBorderBottomRightRadius,
        checkboxBorderBottomLeftRadius,
        checkboxFontSize,
        checkboxWidth,
        checkboxHeight,
        checkboxMarginTop,
        checkboxMarginRight,
        checkboxMarginBottom,
        checkboxMarginLeft,
        checkboxCheckmarkWidth,
        checkboxCheckmarkHeight
    } = useCheckboxThemeVariables(options);

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
    } = setExportsNamespace(useCheckboxThemeSizeVariables(variant, options), 'variant');

    selector(
        `.checkbox.-${variant}`,
        {
            [toVariableKey(checkboxBorderTopLeftRadius)]: ref(variantBorderTopLeftRadius),
            [toVariableKey(checkboxBorderTopRightRadius)]: ref(variantBorderTopRightRadius),
            [toVariableKey(checkboxBorderBottomRightRadius)]: ref(variantBorderBottomRightRadius),
            [toVariableKey(checkboxBorderBottomLeftRadius)]: ref(variantBorderBottomLeftRadius),
            [toVariableKey(checkboxFontSize)]: ref(variantFontSize),
            [toVariableKey(checkboxMarginTop)]: ref(variantMarginTop),
            [toVariableKey(checkboxMarginRight)]: ref(variantMarginRight),
            [toVariableKey(checkboxMarginBottom)]: ref(variantMarginBottom),
            [toVariableKey(checkboxMarginLeft)]: ref(variantMarginLeft),
            [toVariableKey(checkboxWidth)]: ref(variantWidth),
            [toVariableKey(checkboxHeight)]: ref(variantHeight),
            [toVariableKey(checkboxCheckmarkWidth)]: ref(variantCheckmarkWidth),
            [toVariableKey(checkboxCheckmarkHeight)]: ref(variantCheckmarkHeight)
        },
        options
    );
}

/**
 * @TODO MIGRATE THIS
 */
export function useCheckboxThemeColorSelectors(
    variant: CheckboxColorVariant,
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        checkboxColor,
        checkboxBackground,
        checkboxBorderTopColor,
        checkboxBorderRightColor,
        checkboxBorderBottomColor,
        checkboxBorderLeftColor,
        checkboxDisabledBackground,
        checkboxDisabledBorderTopColor,
        checkboxDisabledBorderRightColor,
        checkboxDisabledBorderBottomColor,
        checkboxDisabledBorderLeftColor,
        checkboxReadonlyBackground,
        checkboxReadonlyBorderTopColor,
        checkboxReadonlyBorderRightColor,
        checkboxReadonlyBorderBottomColor,
        checkboxReadonlyBorderLeftColor,
        checkboxCheckedDisabledBackground,
        checkboxCheckedDisabledBorderTopColor,
        checkboxCheckedDisabledBorderRightColor,
        checkboxCheckedDisabledBorderBottomColor,
        checkboxCheckedDisabledBorderLeftColor,
        checkboxCheckedReadonlyBackground,
        checkboxCheckedReadonlyBorderTopColor,
        checkboxCheckedReadonlyBorderRightColor,
        checkboxCheckedReadonlyBorderBottomColor,
        checkboxCheckedReadonlyBorderLeftColor
    } = useCheckboxThemeVariables(options);
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
    } = setExportsNamespace(useCheckboxThemeColorVariables(variant, options), 'variant');

    selector(
        `.checkbox.-${variant}`,
        {
            [toVariableKey(checkboxBorderTopColor)]: ref(variantBorderTopColor),
            [toVariableKey(checkboxBorderRightColor)]: ref(variantBorderRightColor),
            [toVariableKey(checkboxBorderBottomColor)]: ref(variantBorderBottomColor),
            [toVariableKey(checkboxBorderLeftColor)]: ref(variantBorderLeftColor),
            [toVariableKey(checkboxBackground)]: ref(variantBackground),
            [toVariableKey(checkboxColor)]: ref(variantColor),
            [toVariableKey(checkboxDisabledBackground)]: ref(variantDisabledBackground),
            [toVariableKey(checkboxDisabledBorderTopColor)]: ref(variantDisabledBorderTopColor),
            [toVariableKey(checkboxDisabledBorderRightColor)]: ref(variantDisabledBorderRightColor),
            [toVariableKey(checkboxDisabledBorderBottomColor)]: ref(
                variantDisabledBorderBottomColor
            ),
            [toVariableKey(checkboxDisabledBorderLeftColor)]: ref(variantDisabledBorderLeftColor),
            [toVariableKey(checkboxReadonlyBackground)]: ref(variantReadonlyBackground),
            [toVariableKey(checkboxReadonlyBorderTopColor)]: ref(variantReadonlyBorderTopColor),
            [toVariableKey(checkboxReadonlyBorderRightColor)]: ref(variantReadonlyBorderRightColor),
            [toVariableKey(checkboxReadonlyBorderBottomColor)]: ref(
                variantReadonlyBorderBottomColor
            ),
            [toVariableKey(checkboxReadonlyBorderLeftColor)]: ref(variantReadonlyBorderLeftColor),
            [toVariableKey(checkboxCheckedDisabledBackground)]: ref(
                variantCheckedDisabledBackground
            ),
            [toVariableKey(checkboxCheckedDisabledBorderTopColor)]: ref(
                variantCheckedDisabledBorderTopColor
            ),
            [toVariableKey(checkboxCheckedDisabledBorderRightColor)]: ref(
                variantCheckedDisabledBorderRightColor
            ),
            [toVariableKey(checkboxCheckedDisabledBorderBottomColor)]: ref(
                variantCheckedDisabledBorderBottomColor
            ),
            [toVariableKey(checkboxCheckedDisabledBorderLeftColor)]: ref(
                variantCheckedDisabledBorderLeftColor
            ),
            [toVariableKey(checkboxCheckedReadonlyBackground)]: ref(
                variantCheckedReadonlyBackground
            ),
            [toVariableKey(checkboxCheckedReadonlyBorderTopColor)]: ref(
                variantCheckedReadonlyBorderTopColor
            ),
            [toVariableKey(checkboxCheckedReadonlyBorderRightColor)]: ref(
                variantCheckedReadonlyBorderRightColor
            ),
            [toVariableKey(checkboxCheckedReadonlyBorderBottomColor)]: ref(
                variantCheckedReadonlyBorderBottomColor
            ),
            [toVariableKey(checkboxCheckedReadonlyBorderLeftColor)]: ref(
                variantCheckedReadonlyBorderLeftColor
            )
        },
        options
    );
}

export function useCheckboxThemeVariantsSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { checkboxMarginRight } = useCheckboxThemeVariables(options);

    selector(
        '.checkbox.-native input',
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
        '.checkbox.-native .checkbox-label',
        {
            paddingLeft: ref(checkboxMarginRight)
        },
        options
    );

    selector(
        ['.checkbox.-native .checkbox-label::before', '.checkbox.-native .checkbox-label::after'],
        {
            display: 'none'
        },
        options
    );
}

/**
 * Composables
 */

export function useCheckboxThemeSizes(
    sizes: CheckboxSizeVariant[],
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    sizes.forEach((size) => useCheckboxThemeSizeSelectors(size, options));
}

export function useCheckboxThemeColors(
    colors: CheckboxColorVariant[],
    userOptions: DefinitionOptions
) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    colors.forEach((color) => useCheckboxThemeColorSelectors(color, options));
}

export function useCheckboxTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useCheckboxThemeVariables(options);
    useCheckboxThemeLayoutSelectors(options);
    useCheckboxThemeBaseSelectors(options);
    useCheckboxThemeSizes([...defaultCheckboxSizes], options);
    useCheckboxThemeColors([...defaultCheckboxColors], options);
    useCheckboxThemeVariantsSelectors(options);
}
