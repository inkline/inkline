import { defineComponent } from '../../../../../utils';

export const nav = defineComponent(
    {
        color: 'var(--contrast-text-color-light)',
        fontSize: 'var(--font-size)',
        transition: {
            property: 'color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        padding: {
            top: 'var(--padding-top)',
            right: 'var(--padding-right)',
            bottom: 'var(--padding-bottom)',
            left: 'var(--padding-left)'
        },
        item: {
            active: {
                color: 'var(--color-primary)',
                fontWeight: 'var(--font-weight-semibold)'
            },
            disabled: {
                color: 'var(--text-color-weaker)'
            }
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
            fontSize: 'calc(var(--nav--font-size) * var(--size-multiplier-sm))',
            padding: {
                top: 'calc(var(--nav--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--nav--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--nav--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--nav--padding-left) * var(--size-multiplier-sm))'
            }
        },
        md: {
            fontSize: 'calc(var(--nav--font-size) * var(--size-multiplier-md))',
            padding: {
                top: 'calc(var(--nav--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--nav--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--nav--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--nav--padding-left) * var(--size-multiplier-md))'
            }
        },
        lg: {
            fontSize: 'calc(var(--nav--font-size) * var(--size-multiplier-lg))',
            padding: {
                top: 'calc(var(--nav--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--nav--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--nav--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--nav--padding-left) * var(--size-multiplier-lg))'
            }
        }
    }
);
