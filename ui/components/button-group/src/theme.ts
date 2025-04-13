import { DefinitionOptions, defaultDefinitionOptions, selector, variant } from '@inkline/core';

const ns = 'button-group';

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
            // overflow: 'hidden'
        },
        options
    );

    selector(
        ['.button-group .button', '.button-group .button-group'],
        {
            boxShadow: 'none !important'
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
            borderTopRightRadius: '0 !important',
            borderBottomRightRadius: '0 !important',
            borderRightWidth: '0 !important'
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
            borderTopLeftRadius: '0 !important',
            borderBottomLeftRadius: '0 !important'
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
            borderBottomRightRadius: '0 !important',
            borderBottomLeftRadius: '0 !important',
            borderBottomWidth: '0 !important'
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
            borderTopLeftRadius: '0 !important',
            borderTopRightRadius: '0 !important'
        },
        options
    );

    // Block button group

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

/**
 * Variants
 */

export function useButtonGroupThemeVariants(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    variant(
        'button-group',
        {
            extends: ['default', 'box'],
            border: '0',
            padding: '0'
        },
        options
    );

    variant(
        'button-group--block',
        {
            width: '100'
        },
        options
    );

    variant(
        'button-group--block--child',
        {
            flexBasis: '100'
        },
        options
    );
}

/**
 * Composables
 */

export function useButtonGroupTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useButtonGroupThemeLayoutSelectors(options);
    useButtonGroupThemeVariants(options);
}
