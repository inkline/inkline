import { defineComponent } from '../../../../../utils';

export const breadcrumb = defineComponent(
    {
        color: 'var(--text-color-dark)',
        fontSize: 'var(--font-size)',
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom)',
            left: 0
        },
        padding: {
            top: 0,
            right: 'var(--padding-right)',
            bottom: 0,
            left: 'var(--padding-left)'
        },
        separator: '"/"',
        link: {
            color: 'var(--color-primary)'
        },
        active: {
            color: 'var(--color-gray-500)'
        }
    },
    {
        light: {
            color: 'var(--contrast-text-color-light)'
        },
        dark: {
            color: 'var(--contrast-text-color-dark)'
        },
        sm: {
            fontSize: 'calc(var(--breadcrumb--font-size) * var(--size-multiplier-sm))',
            padding: {
                top: 0,
                right: 'calc(var(--breadcrumb--padding-right) * var(--size-multiplier-sm))',
                bottom: 0,
                left: 'calc(var(--breadcrumb--padding-left) * var(--size-multiplier-sm))'
            }
        },
        md: {
            fontSize: 'calc(var(--breadcrumb--font-size) * var(--size-multiplier-md))',
            padding: {
                top: 0,
                right: 'calc(var(--breadcrumb--padding-right) * var(--size-multiplier-md))',
                bottom: 0,
                left: 'calc(var(--breadcrumb--padding-left) * var(--size-multiplier-md))'
            }
        },
        lg: {
            fontSize: 'calc(var(--breadcrumb--font-size) * var(--size-multiplier-lg))',
            padding: {
                top: 0,
                right: 'calc(var(--breadcrumb--padding-right) * var(--size-multiplier-lg))',
                bottom: 0,
                left: 'calc(var(--breadcrumb--padding-left) * var(--size-multiplier-lg))'
            }
        }
    }
);
