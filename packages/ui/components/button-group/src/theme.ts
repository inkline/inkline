import {
    DefinitionOptions,
    defaultDefinitionOptions,
    nsvariables,
    ref,
    selector,
    vref
} from '@inkline/core';
import { useBoxShadow } from '@inkline/theme';

const ns = 'button-group';

/**
 * Config
 */

export function useButtonGroupThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow(options);

    return {
        boxShadow: {
            offsetX: ref(boxShadowOffsetX),
            offsetY: ref(boxShadowOffsetY),
            blurRadius: ref(boxShadowBlurRadius),
            spreadRadius: ref(boxShadowSpreadRadius),
            color: ref(boxShadowColor)
        }
    };
}

/**
 * Variables
 */

export function useButtonGroupThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useButtonGroupThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useButtonGroupThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.button-group',
        {
            position: 'relative',
            display: 'inline-flex',
            verticalAlign: 'middle',
            boxSizing: 'border-box'
        },
        options
    );

    selector(
        ['.button-group .button', '.button-group .button-group'],
        {
            boxShadow: 'none'
        },
        options
    );

    // Horizontal button group

    selector(
        [
            '.button-group.-horizontal > .button:not(:last-child)',
            '.button-group.-horizontal > .button-group:has(+ .button-group) .button:last-child',
            '.button-group.-horizontal > .button-group:has(+ .button) .button:last-child'
        ],
        {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRightWidth: 0
        },
        options
    );

    selector(
        [
            '.button-group.-horizontal > .button:not(:first-child)',
            '.button-group.-horizontal > .button-group + .button-group .button:first-child',
            '.button-group.-horizontal > .button + .button-group .button:first-child'
        ],
        {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        },
        options
    );

    // Vertical button group

    selector(
        [
            '.button-group.-vertical > .button:not(:last-child)',
            '.button-group.-vertical > .button-group:has(+ .button-group) .button:last-child',
            '.button-group.-vertical > .button-group:has(+ .button) .button:last-child'
        ],
        {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomWidth: 0
        },
        options
    );

    selector(
        [
            '.button-group.-vertical > .button:not(:first-child)',
            '.button-group.-vertical > .button-group + .button-group .button:first-child',
            '.button-group.-vertical > .button + .button-group .button:first-child'
        ],
        {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        },
        options
    );

    // Block button group

    selector(
        '.button-group.-block',
        {
            display: 'flex',
            flexBasis: '100%'
        },
        options
    );

    selector(
        '.button-group.-block > .button',
        {
            flexBasis: '100%'
        },
        options
    );

    // Vertical button group

    selector(
        '.button-group.-vertical',
        {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        options
    );

    selector(
        [
            '.button-group.-vertical .button',
            '.button-group.-vertical .button-group',
            '.button-group.-vertical [class$="-wrapper"]'
        ],
        {
            width: '100%'
        },
        options
    );
}

export function useButtonGroupThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { buttonGroupBoxShadow } = useButtonGroupThemeVariables(options);

    selector(
        '.button-group',
        {
            boxShadow: vref(buttonGroupBoxShadow)
        },
        options
    );
}

/**
 * Composables
 */

export function useButtonGroupTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useButtonGroupThemeVariables(options);
    useButtonGroupThemeLayoutSelectors(options);
    useButtonGroupThemeBaseSelectors(options);
}
