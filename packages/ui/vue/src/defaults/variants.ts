import { ComponentVariant } from '@inkline/types';

export const defaultVariants: Record<string, ComponentVariant> = {
    default: {
        extends: 'box',
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
    'default:interactive': {
        extends: 'default'
    },
    'default:interactive:active': {
        background: {
            light: 'gray-100',
            dark: 'dark-tint-100'
        },
        borderColor: {
            light: 'light-shade-50',
            dark: 'dark-tint-50'
        }
    },
    'default:interactive:focus': {
        background: {
            light: 'gray-50',
            dark: 'dark-tint-50'
        },
        borderColor: {
            light: 'light-shade-50',
            dark: 'dark-tint-50'
        }
    },
    'default:interactive:hover': {
        background: {
            light: 'gray-50',
            dark: 'dark-tint-50'
        },
        borderColor: {
            light: 'light-shade-50',
            dark: 'dark-tint-50'
        }
    },
    light: {
        background: 'light',
        borderColor: 'light-shade-50',
        color: 'black'
    },
    'light:interactive': {
        extends: 'light'
    },
    'light:interactive:active': {
        background: 'light-shade-100',
        borderColor: 'light-shade-100'
    },
    'light:interactive:focus': {
        background: 'light-shade-50',
        borderColor: 'light-shade-50'
    },
    'light:interactive:hover': {
        background: 'light-shade-50',
        borderColor: 'light-shade-50'
    },
    dark: {
        background: 'dark',
        borderColor: 'dark-tint-50',
        color: 'white'
    },
    'dark:interactive': {
        extends: 'dark'
    },
    'dark:interactive:active': {
        background: 'dark-tint-100',
        borderColor: 'dark-tint-100'
    },
    'dark:interactive:focus': {
        background: 'dark-tint-50',
        borderColor: 'dark-tint-50'
    },
    'dark:interactive:hover': {
        background: 'dark-tint-50',
        borderColor: 'dark-tint-50'
    },
    primary: {
        background: 'primary',
        borderColor: 'primary-shade-50',
        color: 'white'
    },
    'primary:interactive': {
        extends: 'primary'
    },
    'primary:interactive:active': {
        background: 'primary-shade-100',
        borderColor: 'primary-shade-100'
    },
    'primary:interactive:focus': {
        background: 'primary-shade-50',
        borderColor: 'primary-shade-50'
    },
    'primary:interactive:hover': {
        background: 'primary-shade-50',
        borderColor: 'primary-shade-50'
    },
    'primary:tint': {
        extends: 'primary',
        background: 'primary-100',
        color: 'primary-800'
    },
    secondary: {
        background: 'secondary',
        borderColor: 'secondary-shade-50',
        color: 'white'
    },
    'secondary:interactive': {
        extends: 'secondary'
    },
    'secondary:interactive:active': {
        background: 'secondary-shade-100',
        borderColor: 'secondary-shade-100'
    },
    'secondary:interactive:focus': {
        background: 'secondary-shade-50',
        borderColor: 'secondary-shade-50'
    },
    'secondary:interactive:hover': {
        background: 'secondary-shade-50',
        borderColor: 'secondary-shade-50'
    },
    'secondary:tint': {
        extends: 'secondary',
        background: 'secondary-100',
        color: 'secondary-800'
    },
    success: {
        background: 'success',
        borderColor: 'success-shade-50',
        color: 'white'
    },
    'success:interactive': {
        extends: 'success'
    },
    'success:interactive:active': {
        background: 'success-shade-100',
        borderColor: 'success-shade-100'
    },
    'success:interactive:focus': {
        background: 'success-shade-50',
        borderColor: 'success-shade-50'
    },
    'success:interactive:hover': {
        background: 'success-shade-50',
        borderColor: 'success-shade-50'
    },
    'success:tint': {
        extends: 'success',
        background: 'success-100',
        color: 'success-800'
    },
    info: {
        background: 'info',
        borderColor: 'info-shade-50',
        color: 'white'
    },
    'info:interactive': {
        extends: 'info'
    },
    'info:interactive:active': {
        background: 'info-shade-100',
        borderColor: 'info-shade-100'
    },
    'info:interactive:focus': {
        background: 'info-shade-50',
        borderColor: 'info-shade-50'
    },
    'info:interactive:hover': {
        background: 'info-shade-50',
        borderColor: 'info-shade-50'
    },
    'info:tint': {
        extends: 'info',
        background: 'info-100',
        color: 'info-800'
    },
    warning: {
        background: 'warning',
        borderColor: 'warning-shade-50',
        color: 'white'
    },
    'warning:interactive': {
        extends: 'warning'
    },
    'warning:interactive:active': {
        background: 'warning-shade-100',
        borderColor: 'warning-shade-100'
    },
    'warning:interactive:focus': {
        background: 'warning-shade-50',
        borderColor: 'warning-shade-50'
    },
    'warning:interactive:hover': {
        background: 'warning-shade-50',
        borderColor: 'warning-shade-50'
    },
    'warning:tint': {
        extends: 'warning',
        background: 'warning-100',
        color: 'warning-800'
    },
    danger: {
        background: 'danger',
        borderColor: 'danger-shade-50',
        color: 'white'
    },
    'danger:interactive': {
        extends: 'danger'
    },
    'danger:interactive:active': {
        background: 'danger-shade-100',
        borderColor: 'danger-shade-100'
    },
    'danger:interactive:focus': {
        background: 'danger-shade-50',
        borderColor: 'danger-shade-50'
    },
    'danger:interactive:hover': {
        background: 'danger-shade-50',
        borderColor: 'danger-shade-50'
    },
    'danger:tint': {
        extends: 'danger',
        background: 'danger-100',
        color: 'danger-800'
    },

    /**
     * Box base variants
     */

    'box:base': {
        borderWidth: 'thin',
        borderStyle: 'solid'
    },
    'box:base:xs': {
        extends: 'box:base',
        borderRadius: 'xs',
        boxShadow: 'xs'
    },
    'box:base:sm': {
        extends: 'box:base',
        borderRadius: 'sm',
        boxShadow: 'sm'
    },
    'box:base:md': {
        extends: 'box:base',
        borderRadius: 'md',
        boxShadow: 'md'
    },
    'box:base:lg': {
        extends: 'box:base',
        borderRadius: 'lg',
        boxShadow: 'lg'
    },
    'box:base:xl': {
        extends: 'box:base',
        borderRadius: 'xl',
        boxShadow: 'xl'
    },

    /**
     * Box variants
     */
    'box:3xs': {
        extends: 'box:base:xs',
        padding: '3xs'
    },
    'box:2xs': {
        extends: 'box:base:xs',
        padding: '2xs'
    },
    'box:xs': {
        extends: 'box:base:xs',
        padding: 'xs'
    },
    'box:sm': {
        extends: 'box:base:sm',
        padding: 'sm'
    },
    'box:md': {
        extends: 'box:base:md',
        padding: 'md'
    },
    'box:lg': {
        extends: 'box:base:lg',
        padding: 'lg'
    },
    'box:xl': {
        extends: 'box:base:xl',
        padding: 'xl'
    },
    'box:2xl': {
        extends: 'box:base:xl',
        padding: '2xl'
    },
    'box:3xl': {
        extends: 'box:base:xl',
        padding: '3xl'
    },
    box: {
        extends: 'box:md'
    },

    /**
     * Box wide variants
     */

    'box:wide:2xs': {
        extends: 'box:base:xs',
        paddingX: '2xs',
        paddingY: '3xs'
    },
    'box:wide:xs': {
        extends: 'box:base:xs',
        paddingX: 'xs',
        paddingY: '2xs'
    },
    'box:wide:sm': {
        extends: 'box:base:sm',
        paddingX: 'sm',
        paddingY: 'xs'
    },
    'box:wide:md': {
        extends: 'box:base:md',
        paddingX: 'md',
        paddingY: 'sm'
    },
    'box:wide:lg': {
        extends: 'box:base:lg',
        paddingX: 'lg',
        paddingY: 'md'
    },
    'box:wide:xl': {
        extends: 'box:base:xl',
        paddingX: 'xl',
        paddingY: 'lg'
    },
    'box:wide:2xl': {
        extends: 'box:base:xl',
        paddingX: '2xl',
        paddingY: 'xl'
    },
    'box:wide': {
        extends: 'box:wide:md'
    }
};
