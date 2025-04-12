import type { DefinitionOptions } from '@inkline/core';
import { variant, defaultDefinitionOptions } from '@inkline/core';

export function useVariantsTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    /**
     * Default variant
     */

    variant(
        'default',
        {
            extends: ['box'],
            background: {
                light: 'white',
                dark: 'dark'
            },
            borderColor: {
                light: 'light-shade-50',
                dark: 'dark-tint-50'
            },
            color: {
                light: 'black',
                dark: 'white'
            }
        },
        options
    );

    variant(
        'default--interactive',
        {
            extends: 'default'
        },
        options
    );

    variant(
        'active:default--interactive',
        {
            background: {
                light: 'gray-100',
                dark: 'dark-tint-100'
            },
            borderColor: {
                light: 'light-shade-50',
                dark: 'dark-tint-50'
            }
        },
        options
    );

    variant(
        'focus:default--interactive',
        {
            background: {
                light: 'gray-50',
                dark: 'dark-tint-50'
            },
            borderColor: {
                light: 'light-shade-50',
                dark: 'dark-tint-50'
            }
        },
        options
    );

    variant(
        'hover:default--interactive',
        {
            background: {
                light: 'gray-50',
                dark: 'dark-tint-50'
            },
            borderColor: {
                light: 'light-shade-50',
                dark: 'dark-tint-50'
            }
        },
        options
    );

    /**
     * Light variant
     */

    variant(
        'light',
        {
            background: 'light',
            borderColor: 'light-shade-50',
            color: 'black'
        },
        options
    );

    variant(
        'light--interactive',
        {
            extends: 'light'
        },
        options
    );

    variant(
        'active:light--interactive',
        {
            background: 'light-shade-100',
            borderColor: 'light-shade-100'
        },
        options
    );

    variant(
        'focus:light--interactive',
        {
            background: 'light-shade-50',
            borderColor: 'light-shade-50'
        },
        options
    );

    variant(
        'hover:light--interactive',
        {
            background: 'light-shade-50',
            borderColor: 'light-shade-50'
        },
        options
    );

    variant(
        'dark',
        {
            background: 'dark',
            borderColor: 'dark-tint-50',
            color: 'white'
        },
        options
    );

    variant(
        'dark--interactive',
        {
            extends: 'dark'
        },
        options
    );

    variant(
        'active:dark--interactive',
        {
            background: 'dark-tint-100',
            borderColor: 'dark-tint-100'
        },
        options
    );

    variant(
        'focus:dark--interactive',
        {
            background: 'dark-tint-50',
            borderColor: 'dark-tint-50'
        },
        options
    );

    variant(
        'hover:dark--interactive',
        {
            background: 'dark-tint-50',
            borderColor: 'dark-tint-50'
        },
        options
    );

    variant(
        'primary',
        {
            background: 'primary',
            borderColor: 'primary-shade-50',
            color: 'white'
        },
        options
    );

    variant(
        'primary--interactive',
        {
            extends: 'primary'
        },
        options
    );

    variant(
        'active:primary--interactive',
        {
            background: 'primary-shade-100',
            borderColor: 'primary-shade-100'
        },
        options
    );

    variant(
        'focus:primary--interactive',
        {
            background: 'primary-shade-50',
            borderColor: 'primary-shade-50'
        },
        options
    );

    variant(
        'hover:primary--interactive',
        {
            background: 'primary-shade-50',
            borderColor: 'primary-shade-50'
        },
        options
    );

    variant(
        'primary--tint',
        {
            extends: 'primary',
            background: 'primary-100',
            color: 'primary-800'
        },
        options
    );

    variant(
        'secondary',
        {
            background: 'secondary',
            borderColor: 'secondary-shade-50',
            color: 'white'
        },
        options
    );

    variant(
        'secondary--interactive',
        {
            extends: 'secondary'
        },
        options
    );

    variant(
        'active:secondary--interactive',
        {
            background: 'secondary-shade-100',
            borderColor: 'secondary-shade-100'
        },
        options
    );

    variant(
        'focus:secondary--interactive',
        {
            background: 'secondary-shade-50',
            borderColor: 'secondary-shade-50'
        },
        options
    );

    variant(
        'hover:secondary--interactive',
        {
            background: 'secondary-shade-50',
            borderColor: 'secondary-shade-50'
        },
        options
    );

    variant(
        'secondary--tint',
        {
            extends: 'secondary',
            background: 'secondary-100',
            color: 'secondary-800'
        },
        options
    );

    variant(
        'success',
        {
            background: 'success',
            borderColor: 'success-shade-50',
            color: 'white'
        },
        options
    );

    variant(
        'success--interactive',
        {
            extends: 'success'
        },
        options
    );

    variant(
        'active:success--interactive',
        {
            background: 'success-shade-100',
            borderColor: 'success-shade-100'
        },
        options
    );

    variant(
        'focus:success--interactive',
        {
            background: 'success-shade-50',
            borderColor: 'success-shade-50'
        },
        options
    );

    variant(
        'hover:success--interactive',
        {
            background: 'success-shade-50',
            borderColor: 'success-shade-50'
        },
        options
    );

    variant(
        'success--tint',
        {
            extends: 'success',
            background: 'success-100',
            color: 'success-800'
        },
        options
    );

    variant(
        'info',
        {
            background: 'info',
            borderColor: 'info-shade-50',
            color: 'white'
        },
        options
    );

    variant(
        'info--interactive',
        {
            extends: 'info'
        },
        options
    );

    variant(
        'active:info--interactive',
        {
            background: 'info-shade-100',
            borderColor: 'info-shade-100'
        },
        options
    );

    variant(
        'focus:info--interactive',
        {
            background: 'info-shade-50',
            borderColor: 'info-shade-50'
        },
        options
    );

    variant(
        'hover:info--interactive',
        {
            background: 'info-shade-50',
            borderColor: 'info-shade-50'
        },
        options
    );

    variant(
        'info--tint',
        {
            extends: 'info',
            background: 'info-100',
            color: 'info-800'
        },
        options
    );

    variant(
        'warning',
        {
            background: 'warning',
            borderColor: 'warning-shade-50',
            color: 'white'
        },
        options
    );

    variant(
        'warning--interactive',
        {
            extends: 'warning'
        },
        options
    );

    variant(
        'active:warning--interactive',
        {
            background: 'warning-shade-100',
            borderColor: 'warning-shade-100'
        },
        options
    );

    variant(
        'focus:warning--interactive',
        {
            background: 'warning-shade-50',
            borderColor: 'warning-shade-50'
        },
        options
    );

    variant(
        'hover:warning--interactive',
        {
            background: 'warning-shade-50',
            borderColor: 'warning-shade-50'
        },
        options
    );

    variant(
        'warning--tint',
        {
            extends: 'warning',
            background: 'warning-100',
            color: 'warning-800'
        },
        options
    );

    variant(
        'danger',
        {
            background: 'danger',
            borderColor: 'danger-shade-50',
            color: 'white'
        },
        options
    );

    variant(
        'danger--interactive',
        {
            extends: 'danger'
        },
        options
    );

    variant(
        'active:danger--interactive',
        {
            background: 'danger-shade-100',
            borderColor: 'danger-shade-100'
        },
        options
    );

    variant(
        'focus:danger--interactive',
        {
            background: 'danger-shade-50',
            borderColor: 'danger-shade-50'
        },
        options
    );

    variant(
        'hover:danger--interactive',
        {
            background: 'danger-shade-50',
            borderColor: 'danger-shade-50'
        },
        options
    );

    variant(
        'danger--tint',
        {
            extends: 'danger',
            background: 'danger-100',
            color: 'danger-800'
        },
        options
    );

    /**
     * Box base variants
     */

    variant(
        'box--base',
        {
            borderWidth: 'default',
            borderStyle: 'default'
        },
        options
    );

    variant(
        'box--base--xs',
        {
            extends: 'box--base',
            borderRadius: 'xs',
            boxShadow: 'xs'
        },
        options
    );

    variant(
        'box--base--sm',
        {
            extends: 'box--base',
            borderRadius: 'sm',
            boxShadow: 'sm'
        },
        options
    );

    variant(
        'box--base--md',
        {
            extends: 'box--base',
            borderRadius: 'md',
            boxShadow: 'md'
        },
        options
    );

    variant(
        'box--base--lg',
        {
            extends: 'box--base',
            borderRadius: 'lg',
            boxShadow: 'lg'
        },
        options
    );

    variant(
        'box--base--xl',
        {
            extends: 'box--base',
            borderRadius: 'xl',
            boxShadow: 'xl'
        },
        options
    );

    /**
     * Box variants
     */
    variant(
        'box--3xs',
        {
            extends: 'box--base--xs',
            padding: '3xs'
        },
        options
    );

    variant(
        'box--2xs',
        {
            extends: 'box--base--xs',
            padding: '2xs'
        },
        options
    );

    variant(
        'box--xs',
        {
            extends: 'box--base--xs',
            padding: 'xs'
        },
        options
    );

    variant(
        'box--sm',
        {
            extends: 'box--base--sm',
            padding: 'sm'
        },
        options
    );

    variant(
        'box--md',
        {
            extends: 'box--base--md',
            padding: 'md'
        },
        options
    );

    variant(
        'box--lg',
        {
            extends: 'box--base--lg',
            padding: 'lg'
        },
        options
    );

    variant(
        'box--xl',
        {
            extends: 'box--base--xl',
            padding: 'xl'
        },
        options
    );

    variant(
        'box--2xl',
        {
            extends: 'box--base--xl',
            padding: '2xl'
        },
        options
    );

    variant(
        'box--3xl',
        {
            extends: 'box--base--xl',
            padding: '3xl'
        },
        options
    );

    variant(
        'box',
        {
            extends: 'box--md'
        },
        options
    );

    /**
     * Box wide variants
     */

    variant(
        'box--wide--2xs',
        {
            extends: 'box--base--xs',
            paddingX: '2xs',
            paddingY: '3xs'
        },
        options
    );

    variant(
        'box--wide--xs',
        {
            extends: 'box--base--xs',
            paddingX: 'xs',
            paddingY: '2xs'
        },
        options
    );

    variant(
        'box--wide--sm',
        {
            extends: 'box--base--sm',
            paddingX: 'sm',
            paddingY: 'xs'
        },
        options
    );

    variant(
        'box--wide--md',
        {
            extends: 'box--base--md',
            paddingX: 'md',
            paddingY: 'sm'
        },
        options
    );

    variant(
        'box--wide--lg',
        {
            extends: 'box--base--lg',
            paddingX: 'lg',
            paddingY: 'md'
        },
        options
    );

    variant(
        'box--wide--xl',
        {
            extends: 'box--base--xl',
            paddingX: 'xl',
            paddingY: 'lg'
        },
        options
    );

    variant(
        'box--wide--2xl',
        {
            extends: 'box--base--xl',
            paddingX: '2xl',
            paddingY: 'xl'
        },
        options
    );

    variant(
        'box--wide',
        {
            extends: 'box--wide--md'
        },
        options
    );
}
