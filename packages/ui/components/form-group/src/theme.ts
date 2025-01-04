import { ref, selector, nsvariables, defaultDefinitionOptions } from '@inkline/core';
import { useSpacing } from '@inkline/theme';

const ns = 'form-group';

export function useFormGroupThemeVariables(options = defaultDefinitionOptions) {
    const { spacing } = useSpacing();

    return {
        ...nsvariables(
            ns,
            {
                margin: {
                    top: 0,
                    right: 0,
                    bottom: ref(spacing),
                    left: 0
                }
            },
            options
        )
    };
}

export function useFormGroupThemeLayout() {
    selector('.form-group', {
        display: 'block',
        verticalAlign: 'middle',
        position: 'relative',
        padding: 0
    });

    selector('.form-group.-inline', {
        display: 'flex'
    });

    selector('.form-group.-inline > .form-input-group', {
        flexBasis: '100%'
    });

    selector('.form-group.-inline > .form-label', {
        display: 'flex',
        flex: '0 0 auto',
        alignSelf: 'center',
        marginBottom: 0
    });

    selector('.form-group.-inline > .form-label.-right', {
        marginRight: 0
    });
}

export function useFormGroupThemeBase() {
    const { formGroupMargin } = useFormGroupThemeVariables();

    selector('.form-group', {
        margin: ref(formGroupMargin)
    });

    selector('.form-group:last-child', {
        marginBottom: 0
    });
}

export function useFormGroupTheme() {
    useFormGroupThemeLayout();
    useFormGroupThemeBase();
}
