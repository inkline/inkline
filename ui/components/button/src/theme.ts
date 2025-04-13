import { DefinitionOptions, defaultDefinitionOptions, ref, selector, variant } from '@inkline/core';
import { useFontSize } from '@inkline/theme';

const ns = 'button';

const defaultButtonColors = [
    'light',
    'dark',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
] as const;

const defaultButtonSizes = ['sm', 'md', 'lg'] as const;

export function useButtonThemeLayout(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.button',
        {
            lineHeight: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            outline: 0
        },
        options
    );

    // Button states

    selector(
        ['.button:hover', '.button:focus', '.button:active'],
        {
            textDecoration: 'none'
        },
        options
    );

    selector(
        ['.button[disabled]', '.button:disabled'],
        {
            cursor: 'not-allowed'
        },
        options
    );

    selector(
        '.button[data-loading="true"]',
        {
            cursor: 'default'
        },
        options
    );

    // Button icon and content

    selector(
        ['.button-icon', 'button-content'],
        {
            display: 'inline-flex',
            alignItems: 'center'
        },
        options
    );

    // Button loader

    const { fontSize } = useFontSize(options);

    selector(
        ['.button .loader'],
        {
            width: ref(fontSize),
            height: ref(fontSize)
        },
        options
    );

    // Future-proof disabling of clicks on `<a>` elements

    selector(
        ['a.button.-disabled', '*:disabled a.button'],
        {
            pointerEvents: 'none'
        },
        options
    );
}

/**
 * Variants
 */

export function useButtonThemeVariants(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    defaultButtonSizes.forEach((size) => {
        variant(
            `button--${size}`,
            {
                extends: `box--wide--${size}`,
                fontSize: size
            },
            options
        );

        variant(
            `button--${size}--square`,
            {
                square: size,
                padding: '0'
            },
            options
        );

        variant(
            `button--${size}--circle`,
            {
                extends: `button--${size}--square`,
                borderRadius: 'full'
            },
            options
        );
    });

    defaultButtonColors.forEach((color) => {
        variant(
            `button--${color}`,
            {
                extends: `${color}--interactive`
            },
            options
        );

        variant(
            `hover:button--${color}`,
            {
                extends: `hover:${color}--interactive`
            },
            options
        );

        variant(
            `active:button--${color}`,
            {
                extends: `active:${color}--interactive`
            },
            options
        );

        variant(
            `focus:button--${color}`,
            {
                extends: `focus:${color}--interactive`
            },
            options
        );
    });

    variant(
        'button',
        {
            extends: ['default--interactive', 'button--md'],
            gap: 'md'
        },
        options
    );

    variant(
        'hover:button',
        {
            extends: ['hover:default--interactive']
        },
        options
    );

    variant(
        'active:button',
        {
            extends: ['active:default--interactive']
        },
        options
    );

    variant(
        'focus:button',
        {
            extends: ['focus:default--interactive']
        },
        options
    );

    variant(
        'button--block',
        {
            width: '100'
        },
        options
    );

    variant(
        'button--square',
        {
            extends: 'button--md--square'
        },
        options
    );

    variant(
        'button--circle',
        {
            extends: 'button--md--circle'
        },
        options
    );

    variant(
        'button--disabled',
        {
            opacity: '75'
        },
        options
    );
}

/**
 * Composables
 */

export function useButtonTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useButtonThemeLayout(options);
    useButtonThemeVariants(options);
}
