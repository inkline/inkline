import {
    ref,
    selector,
    nsvariables,
    DefinitionOptions,
    defaultDefinitionOptions,
    vref
} from '@inkline/core';
import { useSpacing } from '@inkline/theme';

const ns = 'form-group';

/**
 * Config
 */

export function useFormGroupThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);

    return {
        margin: {
            top: 0,
            right: 0,
            bottom: ref(spacing),
            left: 0
        }
    };
}

/**
 * Variables
 */

export function useFormGroupThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useFormGroupThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useFormGroupThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.form-group',
        {
            display: 'block',
            verticalAlign: 'middle',
            position: 'relative',
            padding: 0
        },
        options
    );

    selector(
        '.form-group.-inline',
        {
            display: 'flex'
        },
        options
    );

    selector(
        '.form-group.-inline > .form-input-group',
        {
            flexBasis: '100%'
        },
        options
    );

    selector(
        '.form-group.-inline > .form-label',
        {
            display: 'flex',
            flex: '0 0 auto',
            alignSelf: 'center',
            marginBottom: 0
        },
        options
    );

    selector(
        '.form-group.-inline > .form-label.-right',
        {
            marginRight: 0
        },
        options
    );
}

export function useFormGroupThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { formGroupMargin } = useFormGroupThemeVariables(options);

    selector(
        '.form-group',
        {
            margin: vref(formGroupMargin)
        },
        options
    );

    selector(
        '.form-group:last-child',
        {
            marginBottom: 0
        },
        options
    );
}

export function useFormGroupTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useFormGroupThemeVariables(options);
    useFormGroupThemeLayoutSelectors(options);
    useFormGroupThemeBaseSelectors(options);
}
