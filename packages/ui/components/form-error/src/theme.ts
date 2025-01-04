import { ref, selector, nsvariables, defaultDefinitionOptions } from '@inkline/core';
import { useBrandColors, useFontSize, useSpacing } from '@inkline/theme';

const ns = 'form-error';

export function useFormErrorThemeVariables(options = defaultDefinitionOptions) {
    const { colorDanger } = useBrandColors();
    const { fontSizeSm } = useFontSize();
    const { spacing } = useSpacing();

    return {
        ...nsvariables(
            ns,
            {
                color: ref(colorDanger),
                fontSize: ref(fontSizeSm),
                margin: {
                    top: ref(spacing),
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            options
        )
    };
}

export function useFormErrorThemeLayout() {
    selector('.form-error', {
        position: 'relative',
        padding: 0,
        listStyle: 'none'
    });

    selector('.form-error li', {
        margin: 0
    });
}

export function useFormErrorThemeBase() {
    const { formErrorColor, formErrorFontSize, formErrorMargin } = useFormErrorThemeVariables();

    selector('.form-error', {
        color: ref(formErrorColor),
        fontSize: ref(formErrorFontSize),
        margin: ref(formErrorMargin)
    });
}

export function useFormErrorTheme() {
    useFormErrorThemeLayout();
    useFormErrorThemeBase();
}
