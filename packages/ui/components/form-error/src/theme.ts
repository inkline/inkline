import { ref, selector, nsvariables, DefinitionOptions, vref } from '@inkline/core';
import { useBrandColors, useFontSize, useSpacing } from '@inkline/theme';

const ns = 'form-error';

/**
 * Config
 */

export function useFormErrorThemeConfig(options: DefinitionOptions) {
    const { colorDanger } = useBrandColors(options);
    const { fontSizeSm } = useFontSize(options);
    const { spacing } = useSpacing(options);

    return {
        color: ref(colorDanger),
        fontSize: ref(fontSizeSm),
        margin: {
            top: ref(spacing),
            right: 0,
            bottom: 0,
            left: 0
        }
    };
}

/**
 * Variables
 */

export function useFormErrorThemeVariables(options: DefinitionOptions) {
    return nsvariables(ns, useFormErrorThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useFormErrorThemeLayoutSelectors(options: DefinitionOptions) {
    selector(
        '.form-error',
        {
            position: 'relative',
            padding: 0,
            listStyle: 'none'
        },
        options
    );

    selector(
        '.form-error li',
        {
            margin: 0
        },
        options
    );
}

export function useFormErrorThemeBaseSelectors(options: DefinitionOptions) {
    const { formErrorColor, formErrorFontSize, formErrorMargin } =
        useFormErrorThemeVariables(options);

    selector(
        '.form-error',
        {
            color: vref(formErrorColor),
            fontSize: ref(formErrorFontSize),
            margin: vref(formErrorMargin)
        },
        options
    );
}

export function useFormErrorTheme(options: DefinitionOptions) {
    useFormErrorThemeVariables(options);
    useFormErrorThemeLayoutSelectors(options);
    useFormErrorThemeBaseSelectors(options);
}
